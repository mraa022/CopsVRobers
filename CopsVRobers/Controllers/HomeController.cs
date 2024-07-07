using System.Diagnostics;
using Microsoft.AspNetCore.Mvc;
using CopsVRobers.Models;

using System.Collections.Concurrent;
using System.Net.WebSockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Newtonsoft.Json;

namespace CopsVRobers.Controllers;

public class HomeController : Controller
{
    private readonly ILogger<HomeController> _logger;
    private static readonly ConcurrentDictionary<string, WebSocket> connections = new ConcurrentDictionary<string, WebSocket>();

    public HomeController(ILogger<HomeController> logger)
    {
        _logger = logger;
    }

    public IActionResult Index()
    {
        return View();
    }

    public IActionResult Bot(){
        return View();
    }

    public IActionResult Multiplayer(){
        return View();
    }

    public IActionResult JoinLobby(){
        return View();
    }

    public IActionResult About(){
        return View();
    }

    public IActionResult CreateLobby(){
        return View();
    }

   

    [HttpGet("Home/ws")]
        public async Task GetWebSocket()
        {
            if (HttpContext.WebSockets.IsWebSocketRequest)
            {
                var ws = await HttpContext.WebSockets.AcceptWebSocketAsync();
                var wsId = Guid.NewGuid().ToString();
                connections[wsId] = ws;

                Console.WriteLine($"WebSocket Opened: {wsId}");
                var response = new MessageData
                {
                    Type = "lobby_created",
                    Id = wsId
                };
                string jsonResponse = JsonConvert.SerializeObject(response);
                var buffer = Encoding.UTF8.GetBytes(jsonResponse);
                await ws.SendAsync(new ArraySegment<byte>(buffer), WebSocketMessageType.Text, true, CancellationToken.None);

                var bufferReceive = new byte[1024 * 4];
                while (ws.State == WebSocketState.Open)
                {
                    var result = await ws.ReceiveAsync(new ArraySegment<byte>(bufferReceive), CancellationToken.None);
                    if (result.MessageType == WebSocketMessageType.Close)
                    {
                        await ws.CloseAsync(WebSocketCloseStatus.NormalClosure, "Closing", CancellationToken.None);
                        connections.TryRemove(wsId, out _);
                    }
                    else
                    {
                        var message = Encoding.UTF8.GetString(bufferReceive, 0, result.Count);
                        dynamic messageObj = JsonConvert.DeserializeObject(message);
                        if (connections.TryGetValue((string)messageObj.Id.ToString(), out WebSocket otherPlayer))
                        {
                            if (messageObj.Type == "connect")
                            {
                                var responseMessage = new MessageData
                                {
                                    Type = "other_joined",
                                    Id = wsId
                                };
                                var jsonResponseMessage = JsonConvert.SerializeObject(responseMessage);
                                var responseBuffer = Encoding.UTF8.GetBytes(jsonResponseMessage);
                                await otherPlayer.SendAsync(new ArraySegment<byte>(responseBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
                            }
                            else if (messageObj.Type == "move")
                            {
                                Console.WriteLine(messageObj);
                                var moveResponse = new MoveData
                                {
                                    Type = "move",
                                    nodeId = (string)messageObj.nodeId
                                };
                                var moveJsonResponse = JsonConvert.SerializeObject(moveResponse);
                                var moveBuffer = Encoding.UTF8.GetBytes(moveJsonResponse);
                                await otherPlayer.SendAsync(new ArraySegment<byte>(moveBuffer), WebSocketMessageType.Text, true, CancellationToken.None);
                            }
                        }
                    }
                }
            }
            else
            {
                HttpContext.Response.StatusCode = 400;
            }
        }







    [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
    public IActionResult Error()
    {
        return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
    }

    public class MessageData
        {
            public string Type { get; set; }
            public string Id { get; set; }
        }

    public class MoveData
    {
        public string Type { get; set; }
        public string nodeId { get; set; }
    }
}

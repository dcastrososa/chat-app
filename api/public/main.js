const socket = io.connect("http://localhost:3000", { forceNew: true });

socket.on("messages", function(data) {
  console.log(data);
});

const addMessage = () => {
  const message = document.getElementById("message").value;

  socket.emit("new-message", { text: message });
};

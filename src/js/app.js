// code

const eventSource = new EventSource('http://localhost:7070/sse');

eventSource.addEventListener('open', (event) => {
  console.log('connection open');
  console.log(event);
});

eventSource.addEventListener('error', (event) => {
  console.log('something went wrong');
  console.log(event);
});

eventSource.addEventListener('message', (event) => {
  console.log('message))))');
  console.log(event);
  console.log('- - - - - - - - - - - - - - -');
});

<h1>Task Manager</h1>

<h2>Serviços (APIs) para criar, ler, atualizar, finalizar e excluir tarefas.</h2>

APIs disponíveis:

<img width="148" alt="image" src="https://github.com/user-attachments/assets/8dd97c7b-6d6c-4dec-9840-7ab71ac88a67">

GET http://localhost:3333/tasks (search na querystring para pesquisar em title e description)

POST http://localhost:3333/tasks (title e description no body)

PUT http://localhost:3333/tasks/:id (title e description no body)

DELETE http://localhost:3333/tasks/:id

PATCH http://localhost:3333/tasks/:id/complete

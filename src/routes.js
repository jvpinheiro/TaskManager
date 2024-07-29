import { randomUUID } from 'node:crypto'
import { Database } from "./database.js"
import { buildRoutePath } from './utils/build-route-path.js'

const database = new Database()

export const routes = [
    {
        method: 'GET',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { search } = req.query

            const tasks = database.select('tasks', search ? {
                title: search,
                description: search
            } : null)

            return res.end(JSON.stringify(tasks))
        }
    },
    {
        method: 'POST',
        path: buildRoutePath('/tasks'),
        handler: (req, res) => {
            const { title, description } = req.body
            const now = new Date()

            if (!title) {
                return res.writeHead(400).end('Título não encontrado na mensagem.')
            }

            if (!description) {
                return res.writeHead(400).end('Descrição não encontrada na mensagem.')
            }

            const task = {
                id: randomUUID(),
                title: title,
                description: description,
                completed_at: null,
                created_at: now.toLocaleDateString('pt-BR'),
                updated_at: null
            }

            database.insert('tasks', task)

            return res.writeHead(201).end()
        }
    },
    {
        method: 'DELETE',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params

            if (!database.exists('tasks', id)) {
                return res.writeHead(404).end('Tarefa não encontrada!')
            }

            database.delete('tasks', id)

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PUT',
        path: buildRoutePath('/tasks/:id'),
        handler: (req, res) => {
            const { id } = req.params
            const { title, description } = req.body
            
            if (!title) {
                return res.writeHead(400).end('Título não encontrado na mensagem.')
            }

            if (!description) {
                return res.writeHead(400).end('Descrição não encontrada na mensagem.')
            }
            
            const now = new Date()

            const updated_at = now.toLocaleDateString('pt-BR')
            const completed_at = null

            if (!database.exists('tasks', id)) {
                return res.writeHead(404).end('Tarefa não encontrada!')
            }

            database.update('tasks', id, {
                title,
                description,
                completed_at,
                updated_at
            })

            return res.writeHead(204).end()
        }
    },
    {
        method: 'PATCH',
        path: buildRoutePath('/tasks/:id/complete'),
        handler: (req, res) => {
            const { id } = req.params
            
            const now = new Date()

            const completed_at = now.toLocaleDateString('pt-BR')

            if (!database.exists('tasks', id)) {
                return res.writeHead(404).end('Tarefa não encontrada!')
            }

            database.update('tasks', id, {
                completed_at
            })

            return res.writeHead(204).end()
        }
    }
]
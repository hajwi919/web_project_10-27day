const express = require("express")
const fs = require("fs")
const app = express()
const port = 3000;
const template = require('./lib/template.js')
const qs = require('querystring')

app.get('/', (req, res) => {
    let { name } = req.query
    fs.readdir('d-day', (err, files) => {
        let list = template.list(files)
        fs.readFile(`d-day/${name}`, 'utf8', (err, data) => {
            let control = `
            <a href="/create">create</a> 
            <a href="/update?name=${name}">update</a>
            <form action="/delete_process" method="post">
                <input type="hidden" name='id' value='${name}'>
                <button type='submit'>delete</button>
            </form>`
            if (name === undefined) {
                name = '냥코 일정'
                data = '일정 잘 올리십쇼'
                control = `<a href="/create">create</a>`
            }
            const body = `<p>${data}</p>`
            const html = template.HTML(name, list, body, control)

            res.send(html)
        })
    })
})

app.get('/create', (req,res)=>{
    fs.readdir('d-day', (err, files)=>{
        const name = 'create'
        const list = template.list(files)
        const data = template.create()
        const html = template.HTML(name, list, data, '')
        res.send(html)
    })
})

app.post('/create_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const title = post.title
        const description = post.description
        fs.writeFile(`d-day/${title}`, description, 'utf8', (err)=>{
            res.redirect(302, `/?name=${title}`)
        })
    })
    
})

app.get('/update', (req,res)=>{
    let { name } = req.query
    fs.readdir('d-day', (err, files)=>{
        let list = template.list(files)
        fs.readFile(`d-day/${name}`, 'utf8', (err, content) => {
            let control = `<a href="/create">create</a> <a href="/update?name=${name}">update</a>
            <form action="delete_process" method="post">
                <input type="hidden" name='id' value='${name}'>
                <button type='submit'>delete</button>
            </form>`
            const data = template.update(name, content)
            const html = template.HTML(name, list, `<h2>${name}</h2><!-- 내용 부분 --><p>${data}</p>`, control)
            res.send(html)
        })
    })
})

app.post('/update_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        const title = post.title
        const description = post.description
        fs.rename(`d-day/${id}`,`d-day/${title}`,(err)=>{
            fs.writeFile(`d-day/${title}`, description, 'utf8', (err)=>{
                res.redirect(302, `/?name=${title}`)
            })
        })
    })
    
})

app.post('/delete_process', (req, res)=>{
    let body = ''
    req.on('data', (data)=>{
        body = body + data
    })
    req.on('end', ()=>{
        const post = qs.parse(body)
        const id = post.id
        fs.unlink(`d-day/${id}`, (err)=>{
            res.redirect(302, `/`)
        })
    })
    
})

app.listen(port, () => {
    console.log(`server running on port ${port}`)
})

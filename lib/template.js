module.exports = {
    HTML: function (name, list, data, control) {
        return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>${name}</title>
    </head>
    <body>
        <h1><a href="/">냥코 대전댕 일정 올리기</a></h1>
        ${list}
        ${data}
        ${control}
        <p><strong>제작자 : 김종우</strong><p>
    </body>
    </html>`
    }, list: function (files) {
        let list = '<ol>'
        for (i = 0; i < files.length; i++) {
            list = list + `<li><a href="?name=${files[i]}">${files[i]}</a></li>`
        }
        list = list + '</ol>'
        return list
    },create:function(){
        return `
        <form action="/create_process" method="POST">
            <p><input type="text" name="title" placeholder="title"></p>
            <p><textarea name="description" placeholder="description"></textarea></p>
            <p><button type="submit">send</button></p>
        </form>
        `
    },update:function(name, content){
        return `
        <form action="/update_process" method="POST">
            <p><input type="hidden" name="id" value=${name}></p>
            <p><input type="text" name="title" placeholder="title" value=${name}></p>
            <p><textarea name="description" placeholder="description">${content}</textarea></p>
            <p><button type="submit">send</button></p>
        </form>
        `
    }
}
const socket = io()

// DOM
let username = document.getElementById('username')
let btn = document.getElementById('btn')
let msgs = document.getElementById('msgs')

btn.addEventListener('click', () => {
    if (username.value != "") {
        let text = document.getElementById('text')
        if (text.value != "") {
            socket.emit('chat:msg', {
                msg: text.value,
                username: username.value
            })
            text.value = ""
        } else {
            alert("The Message Must Be Longer")
        }
    } else {
        alert("You Need A Username")
    }

})

socket.on('server:msg',(data) => {
    msgs.innerHTML += `
        <div class="msg box is-small">
            <h3>
                ${data.username}
            </h3>
            <p>
                ${data.msg}
            </p>
        </div>
    `
})
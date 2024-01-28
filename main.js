import passwords from "./password.js";

let username, password, repeat_password;

const show_registration = document.querySelector("#show_registration");

const registration = document.querySelector("#registration");
const authorization = document.querySelector("#authorization");

submit.onclick = () => {
    console.log(md5("abc"))
    username = document.querySelector("#username").value;
    password = document.querySelector("#password").value;

    const usernameId = passwords.reduce((acc, el, i) => el.username === username ? i : acc, false)

    if (usernameId || usernameId === 0) {
        if (md5(password) === passwords[usernameId].password) {
            result.innerHTML = "<span style='color: lightgreen;'>Вы успешно вошли в акккаунт</span>"
        } else {
            result.innerHTML = "<span style='color: red;'>Введён неправильный пароль</span>"
        }
    } else {
        result.innerHTML = "<span style='color: #9d9d9d;'>Пользователь не найден</span>"
    }
}

reg_submit.onclick = () => {
    username = document.querySelector("#reg_username").value;
    password = document.querySelector("#reg_password").value;
    repeat_password = document.querySelector("#reg_rep_password").value;

    const isUsername = passwords.reduce((acc, el) => el.username === username ? true : acc, false)

    if (isUsername) {
        reg_result.innerHTML = "<span style='color: red;'>Пользователь уже есть</span>"
    } else {
        if (password !== repeat_password) {
            reg_result.innerHTML = "<span style='color: red;'>Введены разные пароли</span>"
        } else if (password.length < 8) {
            reg_result.innerHTML = "<span style='color: red;'>Пароль короче 8 символов</span>"

        } else {
            passwords.push({
                username: username,
                password: md5(password)
            });

            document.cookie = `user=${username}`
            document.cookie = `password=${md5(password)}`

            reg_result.innerHTML = "<span style='color: lightgreen;'>Вы успешно создали аккаунт</span>";
        }
    }

}


show_registration.onclick = () => {
    if (registration.style.display === "block") {
        registration.style.display = "none"
        authorization.style.display = "block"
    } else {
        registration.style.display = "block"
        authorization.style.display = "none"
    }
}

window.onload = () => {
    if (document.cookie) {
        console.log(`Вы в аккаунте ${document.cookie.replace(/.*user=(\w+);?.*/g, "$1")}`)
        // console.log(`Пароль: ${document.cookie.replace(/.*password=(\w+);?.*/g, "$1")}`)

        passwords.push({
            username: document.cookie.replace(/.*user=(\w+);?.*/g, "$1"),
            password: document.cookie.replace(/.*password=(\w+);?.*/g, "$1")
        })
    }
}
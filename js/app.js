document.addEventListener('DOMContentLoaded', () => {

    const email = document.querySelector('#email')
    const cc = document.querySelector('#cc')
    const asunto = document.querySelector('#asunto')
    const message = document.querySelector('#message')
    const btnSubmit = document.querySelector('button[type="submit"]')
    const btnReset = document.querySelector('button[type="reset"]')
    const spinner = document.querySelector('.spinner')
    const formulario = document.querySelector('#formulario')
    const correo = {
        email: '',
        cc: '',
        asunto: '',
        message: ''
    }

    email.addEventListener('input', validateInput)
    cc.addEventListener('input', validateInput)
    asunto.addEventListener('input', validateInput)
    message.addEventListener('input', validateInput)
    btnSubmit.addEventListener('click', submit)
    btnReset.addEventListener('click', (e) => {
        e.preventDefault()
        correo.email = ''
        correo.cc = ''
        correo.asunto = ''
        correo.message = ''

        formulario.reset()

        comprobarInputs()
    })


    function validateInput(e) {
        if (e.target.value.trim() === '') {
            errorHtml(`El campo ${e.target.id} es obligatorio`, e.target.parentElement)
            correo[e.target.id] = ''
            return
        }

        if (e.target.id === 'email' && !validateEmail(e.target.value)) {
            correo[e.target.id] = ''
            errorHtml('El email es invalido', e.target.parentElement)
            return
        }

        if (e.target.id === 'cc' && !validateEmail(e.target.value)) {
            correo[e.target.id] = ''
            errorHtml('El email es invalido', e.target.parentElement)
            return
        }

        clearError(e.target.parentElement)

        correo[e.target.id] = e.target.value

        comprobarInputs()


    }

    function submit(e) {

        e.preventDefault()
        spinner.classList.remove('spinner')
        spinner.classList.add('spinner-active')
        setTimeout(() => {
            spinner.classList.remove('spinner-active')
            spinner.classList.add('spinner')
            const confirmation = document.createElement('P')
            confirmation.innerHTML = `El mensaje se envió correctamente`
            confirmation.classList.add('confirmation')
            formulario.appendChild(confirmation)

            setTimeout(() => {

                formulario.removeChild(confirmation)
                resetInputs(e)

            }, 3000)

        }, 3000)
    }

    function errorHtml(message, referencia) {
        clearError(referencia)
        const messageError = document.createElement('P')
        messageError.innerHTML = message
        messageError.classList.add('error')
        referencia.appendChild(messageError)

    }

    function clearError(referencia) {
        const existe = referencia.querySelector('.error')
        if (existe) {
            existe.remove()
        }
    }

    function validateEmail(email) {
        const regex = /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/
        const resultado = regex.test(email)
        return resultado
    }



    function comprobarInputs() {

        if (!Object.values(correo).includes('')) {
            btnSubmit.classList.remove('disabled')
            btnSubmit.disabled = false
            return
        }
        btnSubmit.classList.add('disabled')
        btnSubmit.disabled = true

    }

    function resetInputs(e) {
        e.preventDefault()
        correo.email = ''
        correo.cc = ''
        correo.asunto = ''
        correo.message = ''

        formulario.reset()

        comprobarInputs()
    }
})
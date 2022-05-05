const vapidPublic = 'BIkJ8Gm0A9xMMoodOtF7xKJzCXq3ZOhEkZNw82Fck6bWvbQy1jgvZnsueL71w7GavzuC4j-YlaQYN_suWVoGxHc'

const urlBase64toUint8Array = (base64String) =>{
    const padding = '='.repeat((4 - base64String.length %4) %4)
    const base64 = (base64String + padding)
    .replace(/\-/g, '+')
    .replace(/_/g, '/')

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length)

    for (let i = 0; i < rawData.length; i++) {
        outputArray[i] = rawData.charCodeAt(i)
    }
    return outputArray
}

if('serviceWorker' in navigator){
    send().catch(err => console.error(err))
}

async function send(){
    const register = await navigator.serviceWorker.register('../../JavaScript/worker.js', {
        scope: '../../JavaScript/'
    })
    const subscription = await register.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64toUint8Array(vapidPublic)
    })

    await fetch('repairs/notification', {
        method: 'POST',
        body: JSON.stringify(subscription),
        headers: {
            "content-type": "application/json"
        }
    })
}


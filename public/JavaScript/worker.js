self.addEventListener('push', e =>{
    const data = e.data.json();
    self.ServiceWorkerRegistration.showNotification(
        data.title,
        {
            body: 'Hewooo'
        }
    )
})
self.addEventListener('push', function(event) {
    const promiseChain = self.registration.showNotification('Hello, World1.', {
        body: 'This notification was generated from a push-test!',
        icon: '',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: '2'
        },
        actions: [
        {action: 'explore', title: 'Explore this new world',
            icon: ''},
        {action: 'close', title: 'Close',
            icon: ''},
        ]
    });
    event.waitUntil(promiseChain);

    if (event.data) {
        console.log('This push event has data1: ', event.data.text());
    } else {
        console.log('This push event has no data.');
    }
});
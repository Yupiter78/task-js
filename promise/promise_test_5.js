// Function for loading a JavaScript file
/*
const loadJs = (src, success, error) => {
    const script = document.createElement('script');
    script.onload = success;
    script.onerror = error;
    script.src = src;
    document.head.append(script);
}

// The code to open a modal window should be executed after bootstrap.bundle.min.js is loaded,
// and bootstrap.bundle.min.js should only be loaded after jquery.min.js is loaded.
loadJs('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js',
    () => {
        loadJs('https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js',
            () => {
                setTimeout(() => {
                    $('.modal').modal('show');
                }, 1000);
            },
            () => {
                console.error('Error loading scripts!');
            }
        )
    },
    () => {
        console.error('Error loading scripts!');
    }
)*/


const loadJs = (src) => {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.onload = resolve;
        script.onerror = reject;
        script.src = src;
        document.head.append(script);
    })
}

// The code to open a modal window should be executed after bootstrap.bundle.min.js is loaded,
// and bootstrap.bundle.min.js should only be loaded after jquery.min.js is loaded.
loadJs('https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js')
    .then(() => loadJs('https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/js/bootstrap.bundle.min.js'))
    .then(() => setTimeout(() => $('.modal').modal('show'), 1000))
    .catch(() => console.error('Error loading scripts!'));
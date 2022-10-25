if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
    .then(registration => {
        console.log("sw registered");

    }).catch(error => {
        console.log("sw reg fail")
        console.log(error)
    })
} else {
    alert("serviceworker not supported")
}
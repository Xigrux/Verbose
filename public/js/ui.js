function init() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            console.log("ui init")
            resolve()
        }, 100);
    })
}

export {init};
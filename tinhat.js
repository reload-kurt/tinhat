window.__tincan = {
    reactors: [],
    count: 0,
};


/// Create a reactive variable
window.thReactive = (initialValue) => {
    const reactor = {
        id: window.__tincan.count++,
        value: initialValue,
        update: function(value) {
            const oldValue = this.value;
            this.value = value;
            this.callbacks.forEach(cb => cb(oldValue, this.value))
        },
        callbacks: []
    }
    
    window.__tincan.reactors.push(reactor);

    return reactor;
}
 
/// watch for changes to a reactive variable and call its callback(s)
/// with the old and new value
window.thWatch = (reactor, callback/* fn(beforeValue, afterValue) */) => {
    const index = window.__tincan.reactors.findIndex(r => r.id === reactor.id);

    if(index !== -1) {
        window.__tincan.reactors[index].callbacks.push(callback);
    }
}


// DOM helper utilities
window.thClassAdd = (elementSelector, classList) => {
    const els = document.querySelectorAll(elementSelector);
    els.forEach(el => {
        if(Array.isArray(classList)) {
            classList.forEach(cl => {
                if(!el.classList.contains(cl)) {
                    el.classList.add(cl);
                }
            })
        } else {
            if(!el.classList.contains(classList)) {
                el.classList.add(classList)
            }
        } 
    })
}

window.thClassRemove = (elementSelector, classList) => {
    if(Array.isArray(classList)) {
        document.querySelectorAll(elementSelector).forEach(el => classList.forEach(cl => el.classList.remove(cl)));
    } else {
        document.querySelectorAll(elementSelector).forEach(el => el.classList.remove(classList));
    } 
}

window.thClassToggle = (elementSelector, classList) => {
    const els = document.querySelectorAll(elementSelector);
    els.forEach(el => {
        if(Array.isArray(classList)) {
            classList.forEach(cl => {
                if(el.classList.contains(cl)) {
                    el.classList.remove(cl);
                } else {
                    el.classList.add(cl);
                }
            })
        } else {
            if(el.classList.contains(classList)) {
                el.classList.remove(classList);
            } else {
                el.classList.add(classList);
            }
        }
    });
}

window.thAttributeSet = (elementSelector, attribute, value) => {
    const els = document.querySelectorAll(elementSelector);
    els.forEach(el => {
        el.setAttribute(attribute, value)
    })
}

window.thSetInner = (elementSelector, innerHtml) => {
    const els = document.querySelectorAll(elementSelector);
    els.forEach(el => {
        el.innerHTML = innerHtml;
    });
}
import isObject from "isobject"

class LocalStorageCache {
    constructor(cacheName){
        this.cacheName = cacheName
    }
    has(key){
        const stored = JSON.parse(localStorage.getItem(this.cacheName))

        if (!isObject(stored)) return false

        return stored[key] != undefined
    }
    get(key){
        return JSON.parse(localStorage.getItem(this.cacheName))[key]
    }
    set(key, value){
        const stored = JSON.parse(localStorage.getItem(this.cacheName))

        const updated = stored == null ? {} : stored
        
        updated[key] = value

        localStorage.setItem(this.cacheName, JSON.stringify(updated))
    }
}

export default LocalStorageCache
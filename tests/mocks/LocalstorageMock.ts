export default class LocalStorageMock {
    storage: any = {}
    getItem(key) {
        return this.storage[key]
    }
    setItem(key, value) {
        this.storage[key] = value
    }
}
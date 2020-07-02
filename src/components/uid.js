export default base => {
    return base + '-' + Math.random().toString(36).substr(2, 9)
}

function generateUtils({data, location}) {

    return {
        group(name, opt = {}) {
            const {
                isDesc = true,
                split = true
            } = opt;
            // name = map[name] || name;
            let group = []
            for (let k in data.meta) {
                if (new RegExp('^' + name + (name.endsWith('/') ? '' : (split ? '\/' : '') )).test(k)) {
                    group.push(Object.assign({}, data.meta[k], {_key: k}))
                }
            }
            return group.sort((a, b) =>
                isDesc ? new Date(b.datetime).getTime() - new Date(a.datetime).getTime()
                    : new Date(a.datetime).getTime() - new Date(b.datetime).getTime()
            )
        },
        pagination(name, opt) {
            let key = decodeURIComponent(location.pathname);
            let group = this.group(name, opt);
            let i = group.findIndex(x => x._key === key);
            return {
                prev: group[i-1],
                next: group[i+1],
                curr: group[i]
            }
        }
    }
}

module.exports = function (opt) {
    return function (data) {
        return {utils: generateUtils(data)}
    }
}
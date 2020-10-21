module.exports = {
    formatAddress: (a) => {
        let len = a.length - 1;
        let abbrev = a[0] + a[1] + a[2] + a[3] + a[4] + a[5] + "....." + a[len - 4] + a[len -3] + a[len -2] + a[len - 1] + a[len];
        return abbrev;
        
    }
}
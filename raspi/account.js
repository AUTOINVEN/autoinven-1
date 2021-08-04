module.exports = () => {
    var readline = require('readline');
    return new Promise(resolve => {
        var r1 = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
        r1.question('ID: ', (id) => {
            r1.question('Password: ', (pw) => {
                r1.close();
                console.clear();
                resolve({id, pw});
            });
        });
    })
}

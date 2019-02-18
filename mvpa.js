function ReadFileByLine(file, lineCallback=(line) => {}, closeCallback=() => {}){
    const lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(file)
    })
      
    lineReader
        .on('line', lineCallback)
        .on('close', closeCallback)
}

const mvpa_threshold = 118
const mvpa_minimum_period = 10

let result = []
ReadFileByLine(
    'fakereal.txt',
    line => result = [...result, parseInt(line)], 
    () => {
        const start = new Date()
        const total = result
            .map(heart_rate => heart_rate > mvpa_threshold ? 1 : 0)
            .reduce(
                (acc, current) => current == 0 ? [...acc, 0] : [...acc.slice(0, -1), acc[acc.length -1] + 1],
                [0]
            )
            .reduce((acc, current) => current >= mvpa_minimum_period? acc + current : acc, 0)
        const end = new Date()

        console.log(`Result: [${total}], with ellapsed time ${end - start} ms`)
    })
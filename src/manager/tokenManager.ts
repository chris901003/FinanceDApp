import SparkMD5 from 'spark-md5'

export function getRandomBytes(length: number) {
    const array = new Uint32Array(length)
    window.crypto.getRandomValues(array)
    return array
}

export function getSparkMD5Value(data: string[]) {
    let info = data.join(" ")
    const hashValue = SparkMD5.hash(info)
    return hashValue
}

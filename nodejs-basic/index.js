const initialMemoryUsage = process.memoryUsage().heapUsed; 
const yourName = process.argv[2];
const ebvironment = process.env.NODE_ENV;

for(let i = 0; i<=10000; i++) {

}

const current = process.memoryUsage().heapUsed;

console.log("Halo, " + yourName);
console.log("Mode environtment, " + ebvironment);
console.log(`Penggunaan memori dari ${initialMemoryUsage} naik ke ${current}`);

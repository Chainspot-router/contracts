const bigInt = require("big-integer");

export function addressToUint(address: any) {
    const addressBytes = Buffer.from(address.slice(2), "hex");
    let uintValue = bigInt(0);
    for (let i = 0; i < addressBytes.length; i++) {
        uintValue = uintValue.multiply(256).add(addressBytes[i]);
    }

    return uintValue.toString();
}

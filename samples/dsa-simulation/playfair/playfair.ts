
// make playfair matrix from given key
export function makePlayfairMatrix(key: string, input: string) {
    var matrix = [
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' '],
        [' ', ' ', ' ', ' ', ' ']
    ]
    
    key = key.toLowerCase().replace(/ /gmi, "")
    console.log(key);
    
    // make a non repeating array
    var arr = [];
    var set = new Set();
    for (let i of key) {
        if (!set.has(i)) {
            if (i !== 'j' && i !== 'i') {
                arr.push(i)
                set.add(i)
            } else {
                if (i === "i" && !set.has('j')) {
                    arr.push(i)
                    set.add(i)
                } else if (i === "j" && !set.has('i')) {
                    arr.push(i)
                    set.add(i)
                }
            }

        }
    }
    // fill the given array in the set
    let i = 0
    let j = 0
    for (i = 0; i < matrix.length; i++) {
        if (!arr.length) break
        for (j = 0; j < matrix[0].length; j++) {
            if (!arr.length) {
                console.log(i, j);
                break
            }
      
            matrix[i][j] = arr.shift()
            console.log(i, j, matrix[i][j])
        }
    }
    
    
    // fill the remaining characters now and skip the j and i
    
    if (j >= matrix[0].length) {
        j = 0
    } else {
        i--
    }

    console.log(matrix.length, matrix[0].length, i, j);
    console.log(String.fromCharCode(97));
    
    var char = 97

    while (i < matrix.length) {
        console.log(i);
        while (j < matrix[0].length) {
            console.log(String.fromCharCode(char));

            if (!set.has(String.fromCharCode(char))) {
                console.log('yes');
                if (String.fromCharCode(char) === "i") {
                    if (set.has("j")) {
                        char++
                        continue
                    }
                }
                if (String.fromCharCode(char) === 'j') {
                    if (set.has('i')) {
                        char++
                        continue
                    }
                }
                set.add(String.fromCharCode(char))
                matrix[i][j] = String.fromCharCode(char++)
                j++
            }
            else {
                char++
                continue
            }
        }
        j = 0
        i++
    }

    return matrix
}

export function cipher(matrix : string[][], input : string){
 

    // convert the plain text into groups of 2-2 input blocks
    var inputBuffer = input.toLowerCase().replace(/ /gmi, '').split('')
    var blocks = []


    // creation of blocks by the given set of rules
    while(inputBuffer.length){
        var block = []
        var a = inputBuffer.shift()
        var b = inputBuffer.shift() || 'z'


        // if both characters are same
        // eg : aab -> ax ab
        if(a === b){
            block.push(a)
            block.push('x')
            blocks.push(block)
            block = []
            block.push(b)

            // in case of tripple or more same characters
            // we check if the next character is same or not
            // eg : aaaab -> ax ax | a was shifted to check then unshift if conditions not met
            // continue ->  ax ax ax ab
            let next = inputBuffer.shift() || 'z'
            if(next !== b){
                block.push(next)
            }else{
                block.push('x')
                inputBuffer.unshift(next)
            }
            blocks.push(block)
            continue
        }
        
        block.push(a, b)
        blocks.push(block)
    }

    
    // implementation of playfair algorithm
    for(let block of blocks){
        var idx1, idx2;
        var idy1, idy2;
        console.log(block);
        
        // searching algo
        // !Todo : can be optimized later using hashmap
        for(let i =0; i < 5; i++){
            for(let j = 0; j < 5; j++){
                if(matrix[i][j]===block[0]){
                    idx1 = i
                    idy1 = j
                }
                if(matrix[i][j]===block[1]){
                    idx2 = i
                    idy2 = j
                }
            }
        }

        // if in same column
        if(idy1 === idy2){
            block[0] = matrix[(idx1+1)%5][idy1]
            block[1] = matrix[(idx2+1)%5][idy2]
            continue
        }
        // if in same row
        else if(idx1 === idx2){
            block[0] = matrix[idx1][(idy1+1)%5]
            block[1] = matrix[idx2][(idy2+1)%5]
            continue
        }
        // if in different row and column
        else{
            block[0] = matrix[idx1][idy2]
            block[1] = matrix[idx2][idy1]
            continue
        }
    }
    
    return blocks.join('').replace(/,/gmi, '')
    
}

export function playfair(key: string, input: string) {
    var matrix = makePlayfairMatrix(key, input)
    return cipher(matrix, input)
}
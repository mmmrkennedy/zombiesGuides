function findONumber(mNum, upperBound, lowerBound, insectNum, racingNum) {
    // === Possible 'oNum' Values ===
    const possibleONums = [2, 4, 5, 6, 8, 9, 11, 15];

    // === Calculate Possible Results ===
    const possibleResults = [];
    for (const element of possibleONums) {
        possibleResults.push(mNum * element);
    }

    // === Possible Final Numbers ===
    const possibleFinalNums = [lowerBound - 1, lowerBound + 1, upperBound + 1];

    // === Identify 'oNum' Candidates ===
    let indexOfONum = -1;
    let indexOfFinalNum = -1;
    let possibleONumsOnMap = [];
    let resultFound = false;

    for (const result of possibleResults) {
        indexOfFinalNum = -1;
        indexOfONum++;

        for (const finalNum of possibleFinalNums) {
            indexOfFinalNum++;

            if (result === finalNum) {
                resultFound = true;
                possibleONumsOnMap.push(indexOfONum);
            }
        }
    }

    // === Determine Colour Option ===
    let colourOption;
    if (resultFound) {
        if (indexOfFinalNum === 0) {
            colourOption = "Top Colour";
        } else if (indexOfFinalNum === 1) {
            colourOption = "Middle Colour";
        } else if (indexOfFinalNum === 2) {
            colourOption = "Bottom Colour";
        }
    } else {
        colourOption = undefined;
    }

    // === Determine 'oNum' String ===
    let oNum;
    let oNumStr = "";
    let oNumStrCounter = 0;

    if (!resultFound) {
        oNum = undefined;
    } else {
        if (possibleONumsOnMap.length === 1) {
            oNumStr += possibleONums[possibleONumsOnMap[0]];
        } else {
            for (const index of possibleONumsOnMap) {
                if (oNumStrCounter === 0) {
                    oNumStr += possibleONums[index];
                    oNumStrCounter += 1;
                } else {
                    oNumStr += " or " + possibleONums[index];
                }
            }
        }
    }

    // === Determine 'letter' ===
    let letter;
    switch (insectNum) {
        case 3:
            letter = "L";
            break;
        case 6:
            letter = "K";
            break;
        case 9:
            letter = "B";
            break;
        case 10:
            letter = "I";
            break;
        case 11:
            letter = "A";
            break;
        case 12:
            letter = "F";
            break;
        case 14:
            letter = "H";
            break;
        case 16:
            letter = "E";
            break;
        case 7:
        case 15:
            switch (racingNum) {
                case 6:
                    letter = "C";
                    break;
                case 7:
                    letter = "D";
                    break;
                case 11:
                    letter = "G";
                    break;
                case 14:
                    letter = "J";
                    break;
                default:
                    letter = "Invalid Racing Num";
            }
            break;
        default:
            letter = "Invalid Insect Num";
            break;
    }

    // === Handle Special Cases ===
    if (insectNum > 16) {
        letter = "Invalid Insect Num";
    }

    if (insectNum === 0 && racingNum === 0) {
        letter = "";
    }

    // === Return Results ===
    return [oNumStr, colourOption, letter];
}

document.getElementById("calculateButton").addEventListener("click", function() {
    const mNum = parseFloat(document.getElementById("mNum").value);
    const upperBound = parseFloat(document.getElementById("upperBound").value);
    const lowerBound = parseFloat(document.getElementById("lowerBound").value);
    const insectNum = parseInt(document.getElementById("insectNum").value);
    const racingNum = parseInt(document.getElementById("racingNum").value);

    const [oNumStr, colourOption, letter] = findONumber(mNum, upperBound, lowerBound, insectNum, racingNum);

    const resultElement = document.getElementById("result");
    resultElement.innerHTML = `oNumStr: ${oNumStr}<br>Colour Option: ${colourOption}<br>Letter: ${letter}`;
});
let aRot = document.getElementsByClassName("rotella")
let aP_rot = document.getElementsByClassName("p-rotella")
let inputs = document.getElementsByTagName("input")
let indAttivo
let infoRot = [
    {minGrado: 90, maxGrado: 180, minMargin: -33, maxMargin: 275, grado_att: 90, margin_att: -33, x_min: null, x_max: null},
    {minGrado: 90, maxGrado: 180, minMargin: -33, maxMargin: 275, grado_att: 90, margin_att: -33, x_min: null, x_max: null},
    {minGrado: 90, maxGrado: 180, minMargin: -33, maxMargin: 275, grado_att: 90, margin_att: -33, x_min: null, x_max: null},
    {minGrado: 90, maxGrado: 180, minMargin: -33, maxMargin: 275, grado_att: 90, margin_att: -33, x_min: null, x_max: null},
    {minGrado: 90, maxGrado: 180, minMargin: -33, maxMargin: 275, grado_att: 90, margin_att: -33, x_min: null, x_max: null},
]
let x_att = null

for(let k = 0; k < aRot.length; k ++) {
    aRot[k].addEventListener("mousedown", () => {
        indAttivo = k
        x_att = event.x
        let z = k
        aP_rot[z].style.visibility = "visible"
        if(infoRot[z].x_min == null) {
            infoRot[z].x_min = x_att
            infoRot[z].x_max = x_att + 300
        }
        window.addEventListener("mousemove", handleMouseMove)

    })
}

window.addEventListener("mouseup", () => {
    aP_rot[indAttivo].style.visibility = "hidden"
    x_att = null
    window.removeEventListener("mousemove", handleMouseMove)
})

window.addEventListener("keyup", () => {
    if(event.keyCode === 13) {
        for(let k = 0; k < inputs.length; k ++) {
            let grado = parseInt(inputs[k].value)
            if(grado < infoRot[k].minGrado)
                grado = infoRot[k].minGrado
            else if(grado > infoRot[k].maxGrado)
                grado = infoRot[k].maxGrado
            console.log(grado)

            inputs[k].value = grado.toString()
            infoRot[k].margin_att = parseInt(((grado - infoRot[k].minGrado) * (infoRot[k].maxMargin - infoRot[k].minMargin) / (infoRot[k].maxGrado - infoRot[k].minGrado)).toString()) + infoRot[k].minMargin
            console.log(infoRot[k].margin_att)
            aP_rot[k].style.margin = "-60px -14px -14px " + infoRot[k].margin_att.toString() + "px"
            aRot[k].style.margin = "-14px -14px -14px " + infoRot[k].margin_att.toString() + "px"
        }
    }
})

function handleMouseMove(evt) {
    let z = indAttivo
    let x = evt.x

    if(x <= infoRot[z].x_min) {
        infoRot[z].grado_att = infoRot[z].minGrado
        infoRot[z].margin_att = infoRot[z].minMargin
    } else if(x >= infoRot[z].x_max) {
        infoRot[z].grado_att = infoRot[z].maxGrado
        infoRot[z].margin_att = infoRot[z].maxMargin
    } else {
        infoRot[z].margin_att = x + infoRot[z].maxMargin - infoRot[z].x_max
        infoRot[z].grado_att = parseInt(((infoRot[z].maxGrado - infoRot[z].minGrado) * infoRot[z].margin_att / (infoRot[z].maxMargin + infoRot[z].minMargin)).toString()) + infoRot[z].minGrado
        if(infoRot[z].grado_att < infoRot[z].minGrado)
            infoRot[z].grado_att = infoRot[z].minGrado
        else if(infoRot[z].grado_att > infoRot[z].maxGrado)
            infoRot[z].grado_att = infoRot[z].maxGrado
    }

    aP_rot[z].innerHTML = infoRot[z].grado_att.toString()
    inputs[z].value = infoRot[z].grado_att.toString()
    aP_rot[z].style.margin = "-60px -14px -14px " + infoRot[z].margin_att.toString() + "px"
    aRot[z].style.margin = "-14px -14px -14px " + infoRot[z].margin_att.toString() + "px"
}

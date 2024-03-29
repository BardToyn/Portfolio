document.addEventListener("DOMContentLoaded", function (e) {
    if( ! $('#myCanvas').tagcanvas({
            textColour : '#FF4531',
            outlineThickness : 0.5,
            outlineColour : '#FF4531',
            maxSpeed : 0.06,
            freezeActive:true,
            shuffleTags:true,
            shape:'sphere',
            zoom:0.8,
            wheelZoom:false,
            noSelect:true,
            textFont:null,
            freezeDecel:true,
            fadeIn:3000,
            initial: [0.3,-0.1],
            depth : 1.1
        })) {
        // TagCanvas failed to load
        $('#myCanvasContainer').hide();

    }


}, false);







/**
* Copyright (C) 2010-2015 Graham Breach
*
* This program is free software: you can redistribute it and/or modify
* it under the terms of the GNU Lesser General Public License as published by
* the Free Software Foundation, either version 3 of the License, or
* (at your option) any later version.
*
* This program is distributed in the hope that it will be useful,
* but WITHOUT ANY WARRANTY; without even the implied warranty of
* MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
* GNU Lesser General Public License for more details.
*
* You should have received a copy of the GNU Lesser General Public License
* along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/
/**
* jQuery.tagcanvas 2.9
* For more information, please contact <graham@goat1000.com>
*/
(function(ap) {
var M, K, L = Math.abs, ah = Math.sin, w = Math.cos, s = Math.max, aE = Math.min, aq = Math.ceil, F = Math.sqrt, au = Math.pow, h = {}, l = {}, m = {
0: "0,",
1: "17,",
2: "34,",
3: "51,",
4: "68,",
5: "85,",
6: "102,",
7: "119,",
8: "136,",
9: "153,",
a: "170,",
A: "170,",
b: "187,",
B: "187,",
c: "204,",
C: "204,",
d: "221,",
D: "221,",
e: "238,",
E: "238,",
f: "255,",
F: "255,"
}, x, c, Q, aG, H, aH, aa, C = document, p, b = {};
for (M = 0; M < 256; ++M) {
K = M.toString(16);
if (M < 16) {
    K = "0" + K
}
l[K] = l[K.toUpperCase()] = M.toString() + ","
}
function ai(i) {
return typeof i != "undefined"
}
function I(i) {
return typeof i == "object" && i != null
}
function aw(i, j, aI) {
return isNaN(i) ? aI : aE(aI, s(j, i))
}
function aB() {
return false
}
function G() {
return new Date().valueOf()
}
function A(aI, aL) {
var j = [], aJ = aI.length, aK;
for (aK = 0; aK < aJ; ++aK) {
    j.push(aI[aK])
}
j.sort(aL);
return j
}
function an(j) {
var aJ = j.length - 1, aI, aK;
while (aJ) {
    aK = ~~(Math.random() * aJ);
    aI = j[aJ];
    j[aJ] = j[aK];
    j[aK] = aI;
    --aJ
}
}
function ae(i, aI, j) {
this.x = i;
this.y = aI;
this.z = j
}
H = ae.prototype;
H.length = function() {
return F(this.x * this.x + this.y * this.y + this.z * this.z)
}
;
H.dot = function(i) {
return this.x * i.x + this.y * i.y + this.z * i.z
}
;
H.cross = function(j) {
var i = this.y * j.z - this.z * j.y
  , aJ = this.z * j.x - this.x * j.z
  , aI = this.x * j.y - this.y * j.x;
return new ae(i,aJ,aI)
}
;
H.angle = function(j) {
var i = this.dot(j), aI;
if (i == 0) {
    return Math.PI / 2
}
aI = i / (this.length() * j.length());
if (aI >= 1) {
    return 0
}
if (aI <= -1) {
    return Math.PI
}
return Math.acos(aI)
}
;
H.unit = function() {
var i = this.length();
return new ae(this.x / i,this.y / i,this.z / i)
}
;
function aj(aI, j) {
j = j * Math.PI / 180;
aI = aI * Math.PI / 180;
var i = ah(aI) * w(j)
  , aK = -ah(j)
  , aJ = -w(aI) * w(j);
return new ae(i,aK,aJ)
}
function R(i) {
this[1] = {
    1: i[0],
    2: i[1],
    3: i[2]
};
this[2] = {
    1: i[3],
    2: i[4],
    3: i[5]
};
this[3] = {
    1: i[6],
    2: i[7],
    3: i[8]
}
}
aG = R.prototype;
R.Identity = function() {
return new R([1, 0, 0, 0, 1, 0, 0, 0, 1])
}
;
R.Rotation = function(aJ, i) {
var j = ah(aJ)
  , aI = w(aJ)
  , aK = 1 - aI;
return new R([aI + au(i.x, 2) * aK, i.x * i.y * aK - i.z * j, i.x * i.z * aK + i.y * j, i.y * i.x * aK + i.z * j, aI + au(i.y, 2) * aK, i.y * i.z * aK - i.x * j, i.z * i.x * aK - i.y * j, i.z * i.y * aK + i.x * j, aI + au(i.z, 2) * aK])
}
;
aG.mul = function(aI) {
var aJ = [], aM, aL, aK = (aI.xform ? 1 : 0);
for (aM = 1; aM <= 3; ++aM) {
    for (aL = 1; aL <= 3; ++aL) {
        if (aK) {
            aJ.push(this[aM][1] * aI[1][aL] + this[aM][2] * aI[2][aL] + this[aM][3] * aI[3][aL])
        } else {
            aJ.push(this[aM][aL] * aI)
        }
    }
}
return new R(aJ)
}
;
aG.xform = function(aI) {
var j = {}
  , i = aI.x
  , aK = aI.y
  , aJ = aI.z;
j.x = i * this[1][1] + aK * this[2][1] + aJ * this[3][1];
j.y = i * this[1][2] + aK * this[2][2] + aJ * this[3][2];
j.z = i * this[1][3] + aK * this[2][3] + aJ * this[3][3];
return j
}
;
function q(aJ, aL, aR, aO, aQ) {
var aM, aP, j, aN, aS = [], aI = 2 / aJ, aK;
aK = Math.PI * (3 - F(5) + (parseFloat(aQ) ? parseFloat(aQ) : 0));
for (aM = 0; aM < aJ; ++aM) {
    aP = aM * aI - 1 + (aI / 2);
    j = F(1 - aP * aP);
    aN = aM * aK;
    aS.push([w(aN) * j * aL, aP * aR, ah(aN) * j * aO])
}
return aS
}
function W(aK, aI, aN, aU, aR, aT) {
var aS, aV = [], aJ = 2 / aK, aL, aQ, aP, aO, aM;
aL = Math.PI * (3 - F(5) + (parseFloat(aT) ? parseFloat(aT) : 0));
for (aQ = 0; aQ < aK; ++aQ) {
    aP = aQ * aJ - 1 + (aJ / 2);
    aS = aQ * aL;
    aO = w(aS);
    aM = ah(aS);
    aV.push(aI ? [aP * aN, aO * aU, aM * aR] : [aO * aN, aP * aU, aM * aR])
}
return aV
}
function N(aI, aJ, aM, aS, aQ, aO) {
var aR, aT = [], aK = Math.PI * 2 / aJ, aP, aN, aL;
for (aP = 0; aP < aJ; ++aP) {
    aR = aP * aK;
    aN = w(aR);
    aL = ah(aR);
    aT.push(aI ? [aO * aM, aN * aS, aL * aQ] : [aN * aM, aO * aS, aL * aQ])
}
return aT
}
function am(aK, j, aI, aJ, i) {
return W(aK, 0, j, aI, aJ, i)
}
function av(aK, j, aI, aJ, i) {
return W(aK, 1, j, aI, aJ, i)
}
function d(aK, i, j, aI, aJ) {
aJ = isNaN(aJ) ? 0 : aJ * 1;
return N(0, aK, i, j, aI, aJ)
}
function n(aK, i, j, aI, aJ) {
aJ = isNaN(aJ) ? 0 : aJ * 1;
return N(1, aK, i, j, aI, aJ)
}
function ao(aI) {
var j = new Image;
j.onload = function() {
    var aJ = j.width / 2
      , i = j.height / 2;
    aI.centreFunc = function(aO, aL, aM, aK, aN) {
        aO.setTransform(1, 0, 0, 1, 0, 0);
        aO.globalAlpha = 1;
        aO.drawImage(j, aK - aJ, aN - i)
    }
}
;
j.src = aI.centreImage
}
function U(aL, i) {
var aK = aL, aJ, aI, j = (i * 1).toPrecision(3) + ")";
if (aL[0] === "#") {
    if (!h[aL]) {
        if (aL.length === 4) {
            h[aL] = "rgba(" + m[aL[1]] + m[aL[2]] + m[aL[3]]
        } else {
            h[aL] = "rgba(" + l[aL.substr(1, 2)] + l[aL.substr(3, 2)] + l[aL.substr(5, 2)]
        }
    }
    aK = h[aL] + j
} else {
    if (aL.substr(0, 4) === "rgb(" || aL.substr(0, 4) === "hsl(") {
        aK = (aL.replace("(", "a(").replace(")", "," + j))
    } else {
        if (aL.substr(0, 5) === "rgba(" || aL.substr(0, 5) === "hsla(") {
            aJ = aL.lastIndexOf(",") + 1,
            aI = aL.indexOf(")");
            i *= parseFloat(aL.substring(aJ, aI));
            aK = aL.substr(0, aJ) + i.toPrecision(3) + ")"
        }
    }
}
return aK
}
function P(i, j) {
if (window.G_vmlCanvasManager) {
    return null
}
var aI = C.createElement("canvas");
aI.width = i;
aI.height = j;
return aI
}
function al() {
var j = P(3, 3), aJ, aI;
if (!j) {
    return false
}
aJ = j.getContext("2d");
aJ.strokeStyle = "#000";
aJ.shadowColor = "#fff";
aJ.shadowBlur = 3;
aJ.globalAlpha = 0;
aJ.strokeRect(2, 2, 2, 2);
aJ.globalAlpha = 1;
aI = aJ.getImageData(2, 2, 1, 1);
j = null;
return (aI.data[0] > 0)
}
function ak(aM, j, aL, aK) {
var aJ = aM.createLinearGradient(0, 0, j, 0), aI;
for (aI in aK) {
    aJ.addColorStop(1 - aI, aK[aI])
}
aM.fillStyle = aJ;
aM.fillRect(0, aL, j, 1)
}
function k(aK, aI, j) {
var aJ = 1024, aO = 1, aN = aK.weightGradient, aM, aQ, aL, aP;
if (aK.gCanvas) {
    aQ = aK.gCanvas.getContext("2d");
    aO = aK.gCanvas.height
} else {
    if (I(aN[0])) {
        aO = aN.length
    } else {
        aN = [aN]
    }
    aK.gCanvas = aM = P(aJ, aO);
    if (!aM) {
        return null
    }
    aQ = aM.getContext("2d");
    for (aL = 0; aL < aO; ++aL) {
        ak(aQ, aJ, aL, aN[aL])
    }
}
j = s(aE(j || 0, aO - 1), 0);
aP = aQ.getImageData(~~((aJ - 1) * aI), j, 1, 1).data;
return "rgba(" + aP[0] + "," + aP[1] + "," + aP[2] + "," + (aP[3] / 255) + ")"
}
function X(aR, aK, j, aV, aU, aS, aQ, aM, aJ, aT, aL, aP) {
var aO = aU + (aM || 0) + (aJ.length && aJ[0] < 0 ? L(aJ[0]) : 0), aI = aS + (aM || 0) + (aJ.length && aJ[1] < 0 ? L(aJ[1]) : 0), aN, aW;
aR.font = aK;
aR.textBaseline = "top";
aR.fillStyle = j;
aQ && (aR.shadowColor = aQ);
aM && (aR.shadowBlur = aM);
aJ.length && (aR.shadowOffsetX = aJ[0],
aR.shadowOffsetY = aJ[1]);
for (aN = 0; aN < aV.length; ++aN) {
    aW = 0;
    if (aL) {
        if ("right" == aP) {
            aW = aT - aL[aN]
        } else {
            if ("centre" == aP) {
                aW = (aT - aL[aN]) / 2
            }
        }
    }
    aR.fillText(aV[aN], aO + aW, aI);
    aI += parseInt(aK)
}
}
function at(aM, i, aL, j, aJ, aK, aI) {
if (aK) {
    aM.beginPath();
    aM.moveTo(i, aL + aJ - aK);
    aM.arcTo(i, aL, i + aK, aL, aK);
    aM.arcTo(i + j, aL, i + j, aL + aK, aK);
    aM.arcTo(i + j, aL + aJ, i + j - aK, aL + aJ, aK);
    aM.arcTo(i, aL + aJ, i, aL + aJ - aK, aK);
    aM.closePath();
    aM[aI ? "stroke" : "fill"]()
} else {
    aM[aI ? "strokeRect" : "fillRect"](i, aL, j, aJ)
}
}
function g(aO, i, aM, aJ, aN, aI, aK, aL, j) {
this.strings = aO;
this.font = i;
this.width = aM;
this.height = aJ;
this.maxWidth = aN;
this.stringWidths = aI;
this.align = aK;
this.valign = aL;
this.scale = j
}
aa = g.prototype;
aa.SetImage = function(aL, j, aJ, i, aK, aN, aI, aM) {
this.image = aL;
this.iwidth = j * this.scale;
this.iheight = aJ * this.scale;
this.ipos = i;
this.ipad = aK * this.scale;
this.iscale = aM;
this.ialign = aN;
this.ivalign = aI
}
;
aa.Align = function(j, aI, i) {
var aJ = 0;
if (i == "right" || i == "bottom") {
    aJ = aI - j
} else {
    if (i != "left" && i != "top") {
        aJ = (aI - j) / 2
    }
}
return aJ
}
;
aa.Create = function(aV, a1, aU, a2, a0, aZ, i, aY, aQ) {
var aO, aM, aW, a7, a4, a3, aK, aJ, aI, j, aN, aL, aP, aX, aT, a6 = L(i[0]), a5 = L(i[1]), aR, aS;
aY = s(aY, a6 + aZ, a5 + aZ);
a4 = 2 * (aY + a2);
aK = 2 * (aY + a2);
aM = this.width + a4;
aW = this.height + aK;
aI = j = aY + a2;
if (this.image) {
    aN = aL = aY + a2;
    aP = this.iwidth;
    aX = this.iheight;
    if (this.ipos == "top" || this.ipos == "bottom") {
        if (aP < this.width) {
            aN += this.Align(aP, this.width, this.ialign)
        } else {
            aI += this.Align(this.width, aP, this.align)
        }
        if (this.ipos == "top") {
            j += aX + this.ipad
        } else {
            aL += this.height + this.ipad
        }
        aM = s(aM, aP + a4);
        aW += aX + this.ipad
    } else {
        if (aX < this.height) {
            aL += this.Align(aX, this.height, this.ivalign)
        } else {
            j += this.Align(this.height, aX, this.valign)
        }
        if (this.ipos == "right") {
            aN += this.width + this.ipad
        } else {
            aI += aP + this.ipad
        }
        aM += aP + this.ipad;
        aW = s(aW, aX + aK)
    }
}
aO = P(aM, aW);
if (!aO) {
    return null
}
a4 = aK = a2 / 2;
a3 = aM - a2;
aJ = aW - a2;
aT = aE(aQ, a3 / 2, aJ / 2);
a7 = aO.getContext("2d");
if (a1) {
    a7.fillStyle = a1;
    at(a7, a4, aK, a3, aJ, aT)
}
if (a2) {
    a7.strokeStyle = aU;
    a7.lineWidth = a2;
    at(a7, a4, aK, a3, aJ, aT, true)
}
if (aZ || a6 || a5) {
    aR = P(aM, aW);
    if (aR) {
        aS = a7;
        a7 = aR.getContext("2d")
    }
}
X(a7, this.font, aV, this.strings, aI, j, 0, 0, [], this.maxWidth, this.stringWidths, this.align);
if (this.image) {
    a7.drawImage(this.image, aN, aL, aP, aX)
}
if (aS) {
    a7 = aS;
    a0 && (a7.shadowColor = a0);
    aZ && (a7.shadowBlur = aZ);
    a7.shadowOffsetX = i[0];
    a7.shadowOffsetY = i[1];
    a7.drawImage(aR, 0, 0)
}
return aO
}
;
function v(aJ, j, aK) {
var aI = P(j, aK), aL;
if (!aI) {
    return null
}
aL = aI.getContext("2d");
aL.drawImage(aJ, (j - aJ.width) / 2, (aK - aJ.height) / 2);
return aI
}
function ay(aJ, j, aK) {
var aI = P(j, aK), aL;
if (!aI) {
    return null
}
aL = aI.getContext("2d");
aL.drawImage(aJ, 0, 0, j, aK);
return aI
}
function aD(aV, aQ, aW, a0, aR, aP, aN, aT, aL, aM) {
var aJ = aQ + ((2 * aT) + aP) * a0, aS = aW + ((2 * aT) + aP) * a0, aK = P(aJ, aS), aZ, aY, aI, aX, j, a1, aU, aO;
if (!aK) {
    return null
}
aP *= a0;
aL *= a0;
aY = aI = aP / 2;
aX = aJ - aP;
j = aS - aP;
aT = (aT * a0) + aY;
aZ = aK.getContext("2d");
aO = aE(aL, aX / 2, j / 2);
if (aR) {
    aZ.fillStyle = aR;
    at(aZ, aY, aI, aX, j, aO)
}
if (aP) {
    aZ.strokeStyle = aN;
    aZ.lineWidth = aP;
    at(aZ, aY, aI, aX, j, aO, true)
}
if (aM) {
    a1 = P(aJ, aS);
    aU = a1.getContext("2d");
    aU.drawImage(aV, aT, aT, aQ, aW);
    aU.globalCompositeOperation = "source-in";
    aU.fillStyle = aN;
    aU.fillRect(0, 0, aJ, aS);
    aU.globalCompositeOperation = "destination-over";
    aU.drawImage(aK, 0, 0);
    aU.globalCompositeOperation = "source-over";
    aZ.drawImage(a1, 0, 0)
} else {
    aZ.drawImage(aV, aT, aT, aV.width, aV.height)
}
return {
    image: aK,
    width: aJ / a0,
    height: aS / a0
}
}
function ar(aL, j, aK, aO, aP) {
var aM, aN, aI = parseFloat(j), aJ = s(aK, aO);
aM = P(aK, aO);
if (!aM) {
    return null
}
if (j.indexOf("%") > 0) {
    aI = aJ * aI / 100
} else {
    aI = aI * aP
}
aN = aM.getContext("2d");
aN.globalCompositeOperation = "source-over";
aN.fillStyle = "#fff";
if (aI >= aJ / 2) {
    aI = aE(aK, aO) / 2;
    aN.beginPath();
    aN.moveTo(aK / 2, aO / 2);
    aN.arc(aK / 2, aO / 2, aI, 0, 2 * Math.PI, false);
    aN.fill();
    aN.closePath()
} else {
    aI = aE(aK / 2, aO / 2, aI);
    at(aN, 0, 0, aK, aO, aI, true);
    aN.fill()
}
aN.globalCompositeOperation = "source-in";
aN.drawImage(aL, 0, 0, aK, aO);
return aM
}
function Z(aO, aU, aQ, aK, aS, aT, aJ) {
var aV = L(aJ[0]), aP = L(aJ[1]), aL = aU + (aV > aT ? aV + aT : aT * 2) * aK, j = aQ + (aP > aT ? aP + aT : aT * 2) * aK, aN = aK * ((aT || 0) + (aJ[0] < 0 ? aV : 0)), aI = aK * ((aT || 0) + (aJ[1] < 0 ? aP : 0)), aM, aR;
aM = P(aL, j);
if (!aM) {
    return null
}
aR = aM.getContext("2d");
aS && (aR.shadowColor = aS);
aT && (aR.shadowBlur = aT * aK);
aJ && (aR.shadowOffsetX = aJ[0] * aK,
aR.shadowOffsetY = aJ[1] * aK);
aR.drawImage(aO, aN, aI, aU, aQ);
return {
    image: aM,
    width: aL / aK,
    height: j / aK
}
}
function t(aU, aM, aS) {
var aT = parseInt(aU.toString().length * aS), aL = parseInt(aS * 2 * aU.length), aJ = P(aT, aL), aP, j, aK, aO, aR, aQ, aI, aN;
if (!aJ) {
    return null
}
aP = aJ.getContext("2d");
aP.fillStyle = "#000";
aP.fillRect(0, 0, aT, aL);
X(aP, aS + "px " + aM, "#fff", aU, 0, 0, 0, 0, [], "centre");
j = aP.getImageData(0, 0, aT, aL);
aK = j.width;
aO = j.height;
aN = {
    min: {
        x: aK,
        y: aO
    },
    max: {
        x: -1,
        y: -1
    }
};
for (aQ = 0; aQ < aO; ++aQ) {
    for (aR = 0; aR < aK; ++aR) {
        aI = (aQ * aK + aR) * 4;
        if (j.data[aI + 1] > 0) {
            if (aR < aN.min.x) {
                aN.min.x = aR
            }
            if (aR > aN.max.x) {
                aN.max.x = aR
            }
            if (aQ < aN.min.y) {
                aN.min.y = aQ
            }
            if (aQ > aN.max.y) {
                aN.max.y = aQ
            }
        }
    }
}
if (aK != aT) {
    aN.min.x *= (aT / aK);
    aN.max.x *= (aT / aK)
}
if (aO != aL) {
    aN.min.y *= (aT / aO);
    aN.max.y *= (aT / aO)
}
aJ = null;
return aN
}
function o(i) {
return "'" + i.replace(/(\'|\")/g, "").replace(/\s*,\s*/g, "', '") + "'"
}
function ad(i, j, aI) {
aI = aI || C;
if (aI.addEventListener) {
    aI.addEventListener(i, j, false)
} else {
    aI.attachEvent("on" + i, j)
}
}
function a(i, j, aI) {
aI = aI || C;
if (aI.removeEventListener) {
    aI.removeEventListener(i, j)
} else {
    aI.detachEvent("on" + i, j)
}
}
function ax(aM, aI, aQ, aL) {
var aR = aL.imageScale, aO, aJ, aN, j, aK, aP;
if (!aI.complete) {
    return ad("load", function() {
        ax(aM, aI, aQ, aL)
    }, aI)
}
if (!aM.complete) {
    return ad("load", function() {
        ax(aM, aI, aQ, aL)
    }, aM)
}
aI.width = aI.width;
aI.height = aI.height;
if (aR) {
    aM.width = aI.width * aR;
    aM.height = aI.height * aR
}
aQ.iw = aM.width;
aQ.ih = aM.height;
if (aL.txtOpt) {
    aJ = aM;
    aO = aL.zoomMax * aL.txtScale;
    aK = aQ.iw * aO;
    aP = aQ.ih * aO;
    if (aK < aI.naturalWidth || aP < aI.naturalHeight) {
        aJ = ay(aM, aK, aP);
        if (aJ) {
            aQ.fimage = aJ
        }
    } else {
        aK = aQ.iw;
        aP = aQ.ih;
        aO = 1
    }
    if (parseFloat(aL.imageRadius)) {
        aQ.image = aQ.fimage = aM = ar(aQ.image, aL.imageRadius, aK, aP, aO)
    }
    if (!aQ.HasText()) {
        if (aL.shadow) {
            aJ = Z(aQ.image, aK, aP, aO, aL.shadow, aL.shadowBlur, aL.shadowOffset);
            if (aJ) {
                aQ.fimage = aJ.image;
                aQ.w = aJ.width;
                aQ.h = aJ.height
            }
        }
        if (aL.bgColour || aL.bgOutlineThickness) {
            aN = aL.bgColour == "tag" ? Y(aQ.a, "background-color") : aL.bgColour;
            j = aL.bgOutline == "tag" ? Y(aQ.a, "color") : (aL.bgOutline || aL.textColour);
            aK = aQ.fimage.width;
            aP = aQ.fimage.height;
            if (aL.outlineMethod == "colour") {
                aJ = aD(aQ.fimage, aK, aP, aO, aN, aL.bgOutlineThickness, aQ.outline.colour, aL.padding, aL.bgRadius, 1);
                if (aJ) {
                    aQ.oimage = aJ.image
                }
            }
            aJ = aD(aQ.fimage, aK, aP, aO, aN, aL.bgOutlineThickness, j, aL.padding, aL.bgRadius);
            if (aJ) {
                aQ.fimage = aJ.image;
                aQ.w = aJ.width;
                aQ.h = aJ.height
            }
        }
        if (aL.outlineMethod == "size") {
            if (aL.outlineIncrease > 0) {
                aQ.iw += 2 * aL.outlineIncrease;
                aQ.ih += 2 * aL.outlineIncrease;
                aK = aO * aQ.iw;
                aP = aO * aQ.ih;
                aJ = ay(aQ.fimage, aK, aP);
                aQ.oimage = aJ;
                aQ.fimage = v(aQ.fimage, aQ.oimage.width, aQ.oimage.height)
            } else {
                aK = aO * (aQ.iw + (2 * aL.outlineIncrease));
                aP = aO * (aQ.ih + (2 * aL.outlineIncrease));
                aJ = ay(aQ.fimage, aK, aP);
                aQ.oimage = v(aJ, aQ.fimage.width, aQ.fimage.height)
            }
        }
    }
}
aQ.Init()
}
function Y(aJ, aI) {
var j = C.defaultView
  , i = aI.replace(/\-([a-z])/g, function(aK) {
    return aK.charAt(1).toUpperCase()
});
return (j && j.getComputedStyle && j.getComputedStyle(aJ, null).getPropertyValue(aI)) || (aJ.currentStyle && aJ.currentStyle[i])
}
function u(j, aJ, aI) {
var i = 1, aK;
if (aJ) {
    i = 1 * (j.getAttribute(aJ) || aI)
} else {
    if (aK = Y(j, "font-size")) {
        i = (aK.indexOf("px") > -1 && aK.replace("px", "") * 1) || (aK.indexOf("pt") > -1 && aK.replace("pt", "") * 1.25) || aK * 3.3
    }
}
return i
}
function f(i) {
return i.target && ai(i.target.id) ? i.target.id : i.srcElement.parentNode.id
}
function S(aK, aL) {
var aJ, aI, i = parseInt(Y(aL, "width")) / aL.width, j = parseInt(Y(aL, "height")) / aL.height;
if (ai(aK.offsetX)) {
    aJ = {
        x: aK.offsetX,
        y: aK.offsetY
    }
} else {
    aI = ab(aL.id);
    if (ai(aK.changedTouches)) {
        aK = aK.changedTouches[0]
    }
    if (aK.pageX) {
        aJ = {
            x: aK.pageX - aI.x,
            y: aK.pageY - aI.y
        }
    }
}
if (aJ && i && j) {
    aJ.x /= i;
    aJ.y /= j
}
return aJ
}
function B(aI) {
var j = aI.target || aI.fromElement.parentNode
  , i = y.tc[j.id];
if (i) {
    i.mx = i.my = -1;
    i.UnFreeze();
    i.EndDrag()
}
}
function af(aM) {
var aJ, aI = y, j, aL, aK = f(aM);
for (aJ in aI.tc) {
    j = aI.tc[aJ];
    if (j.tttimer) {
        clearTimeout(j.tttimer);
        j.tttimer = null
    }
}
if (aK && aI.tc[aK]) {
    j = aI.tc[aK];
    if (aL = S(aM, j.canvas)) {
        j.mx = aL.x;
        j.my = aL.y;
        j.Drag(aM, aL)
    }
    j.drawn = 0
}
}
function z(aJ) {
var j = y
  , i = C.addEventListener ? 0 : 1
  , aI = f(aJ);
if (aI && aJ.button == i && j.tc[aI]) {
    j.tc[aI].BeginDrag(aJ)
}
}
function aF(aK) {
var aI = y, j = C.addEventListener ? 0 : 1, aJ = f(aK), i;
if (aJ && aK.button == j && aI.tc[aJ]) {
    i = aI.tc[aJ];
    af(aK);
    if (!i.EndDrag() && !i.touchState) {
        i.Clicked(aK)
    }
}
}
function T(aJ) {
var j = f(aJ), i = (j && y.tc[j]), aI;
if (i && aJ.changedTouches) {
    if (aJ.touches.length == 1 && i.touchState == 0) {
        i.touchState = 1;
        i.BeginDrag(aJ);
        if (aI = S(aJ, i.canvas)) {
            i.mx = aI.x;
            i.my = aI.y;
            i.drawn = 0
        }
    } else {
        if (aJ.targetTouches.length == 2 && i.pinchZoom) {
            i.touchState = 3;
            i.EndDrag();
            i.BeginPinch(aJ)
        } else {
            i.EndDrag();
            i.EndPinch();
            i.touchState = 0
        }
    }
}
}
function r(aI) {
var j = f(aI)
  , i = (j && y.tc[j]);
if (i && aI.changedTouches) {
    switch (i.touchState) {
    case 1:
        i.Draw();
        i.Clicked();
        break;
    case 2:
        i.EndDrag();
        break;
    case 3:
        i.EndPinch()
    }
    i.touchState = 0
}
}
function aA(aM) {
var aJ, aI = y, j, aL, aK = f(aM);
for (aJ in aI.tc) {
    j = aI.tc[aJ];
    if (j.tttimer) {
        clearTimeout(j.tttimer);
        j.tttimer = null
    }
}
j = (aK && aI.tc[aK]);
if (j && aM.changedTouches && j.touchState) {
    switch (j.touchState) {
    case 1:
    case 2:
        if (aL = S(aM, j.canvas)) {
            j.mx = aL.x;
            j.my = aL.y;
            if (j.Drag(aM, aL)) {
                j.touchState = 2
            }
        }
        break;
    case 3:
        j.Pinch(aM)
    }
    j.drawn = 0
}
}
function ag(aI) {
var i = y
  , j = f(aI);
if (j && i.tc[j]) {
    aI.cancelBubble = true;
    aI.returnValue = false;
    aI.preventDefault && aI.preventDefault();
    i.tc[j].Wheel((aI.wheelDelta || aI.detail) > 0)
}
}
function ac(aJ) {
var aI, j = y;
clearTimeout(j.scrollTimer);
for (aI in j.tc) {
    j.tc[aI].Pause()
}
j.scrollTimer = setTimeout(function() {
    var aL, aK = y;
    for (aL in aK.tc) {
        aK.tc[aL].Resume()
    }
}, j.scrollPause)
}
function O() {
E(G())
}
function E(aJ) {
var j = y.tc, aI;
y.NextFrame(y.interval);
aJ = aJ || G();
for (aI in j) {
    j[aI].Draw(aJ)
}
}
function ab(aI) {
var aL = C.getElementById(aI)
  , i = aL.getBoundingClientRect()
  , aO = C.documentElement
  , aM = C.body
  , aN = window
  , aJ = aN.pageXOffset || aO.scrollLeft
  , aP = aN.pageYOffset || aO.scrollTop
  , aK = aO.clientLeft || aM.clientLeft
  , j = aO.clientTop || aM.clientTop;
return {
    x: i.left + aJ - aK,
    y: i.top + aP - j
}
}
function V(j, aJ, aK, aI) {
var i = j.radius * j.z1 / (j.z1 + j.z2 + aJ.z);
return {
    x: aJ.x * i * aK,
    y: aJ.y * i * aI,
    z: aJ.z,
    w: (j.z1 - aJ.z) / j.z2
}
}
function aC(i) {
this.e = i;
this.br = 0;
this.line = [];
this.text = [];
this.original = i.innerText || i.textContent
}
aH = aC.prototype;
aH.Empty = function() {
for (var j = 0; j < this.text.length; ++j) {
    if (this.text[j].length) {
        return false
    }
}
return true
}
;
aH.Lines = function(aK) {
var aJ = aK ? 1 : 0, aL, j, aI;
aK = aK || this.e;
aL = aK.childNodes;
j = aL.length;
for (aI = 0; aI < j; ++aI) {
    if (aL[aI].nodeName == "BR") {
        this.text.push(this.line.join(" "));
        this.br = 1
    } else {
        if (aL[aI].nodeType == 3) {
            if (this.br) {
                this.line = [aL[aI].nodeValue];
                this.br = 0
            } else {
                this.line.push(aL[aI].nodeValue)
            }
        } else {
            this.Lines(aL[aI])
        }
    }
}
aJ || this.br || this.text.push(this.line.join(" "));
return this.text
}
;
aH.SplitWidth = function(aI, aP, aM, aL) {
var aK, aJ, aO, aN = [];
aP.font = aL + "px " + aM;
for (aK = 0; aK < this.text.length; ++aK) {
    aO = this.text[aK].split(/\s+/);
    this.line = [aO[0]];
    for (aJ = 1; aJ < aO.length; ++aJ) {
        if (aP.measureText(this.line.join(" ") + " " + aO[aJ]).width > aI) {
            aN.push(this.line.join(" "));
            this.line = [aO[aJ]]
        } else {
            this.line.push(aO[aJ])
        }
    }
    aN.push(this.line.join(" "))
}
return this.text = aN
}
;
function J(i, j) {
this.ts = null;
this.tc = i;
this.tag = j;
this.x = this.y = this.w = this.h = this.sc = 1;
this.z = 0;
this.pulse = 1;
this.pulsate = i.pulsateTo < 1;
this.colour = i.outlineColour;
this.adash = ~~i.outlineDash;
this.agap = ~~i.outlineDashSpace || this.adash;
this.aspeed = i.outlineDashSpeed * 1;
if (this.colour == "tag") {
    this.colour = Y(j.a, "color")
} else {
    if (this.colour == "tagbg") {
        this.colour = Y(j.a, "background-color")
    }
}
this.Draw = this.pulsate ? this.DrawPulsate : this.DrawSimple;
this.radius = i.outlineRadius | 0;
this.SetMethod(i.outlineMethod)
}
x = J.prototype;
x.SetMethod = function(aI) {
var j = {
    block: ["PreDraw", "DrawBlock"],
    colour: ["PreDraw", "DrawColour"],
    outline: ["PostDraw", "DrawOutline"],
    classic: ["LastDraw", "DrawOutline"],
    size: ["PreDraw", "DrawSize"],
    none: ["LastDraw"]
}
  , i = j[aI] || j.outline;
if (aI == "none") {
    this.Draw = function() {
        return 1
    }
} else {
    this.drawFunc = this[i[1]]
}
this[i[0]] = this.Draw
}
;
x.Update = function(aO, aN, aP, aK, aL, aM, aJ, i) {
var j = this.tc.outlineOffset
  , aI = 2 * j;
this.x = aL * aO + aJ - j;
this.y = aL * aN + i - j;
this.w = aL * aP + aI;
this.h = aL * aK + aI;
this.sc = aL;
this.z = aM
}
;
x.Ants = function(aN) {
if (!this.adash) {
    return
}
var aK = this.adash, aM = this.agap, aQ = this.aspeed, j = aK + aM, aL = 0, aJ = aK, i = aM, aP = 0, aO = 0, aI;
if (aQ) {
    aO = L(aQ) * (G() - this.ts) / 50;
    if (aQ < 0) {
        aO = 8640000 - aO
    }
    aQ = ~~aO % j
}
if (aQ) {
    if (aK >= aQ) {
        aL = aK - aQ;
        aJ = aQ
    } else {
        i = j - aQ;
        aP = aM - i
    }
    aI = [aL, i, aJ, aP]
} else {
    aI = [aK, aM]
}
aN.setLineDash(aI)
}
;
x.DrawOutline = function(aM, i, aL, j, aI, aK) {
var aJ = aE(this.radius, aI / 2, j / 2);
aM.strokeStyle = aK;
this.Ants(aM);
at(aM, i, aL, j, aI, aJ, true)
}
;
x.DrawSize = function(aP, aS, aQ, aT, aN, j, aU, aJ, aR) {
var aM = aU.w, aI = aU.h, aK, aL, aO;
if (this.pulsate) {
    if (aU.image) {
        aO = (aU.image.height + this.tc.outlineIncrease) / aU.image.height
    } else {
        aO = aU.oscale
    }
    aL = aU.fimage || aU.image;
    aK = 1 + ((aO - 1) * (1 - this.pulse));
    aU.h *= aK;
    aU.w *= aK
} else {
    aL = aU.oimage
}
aU.alpha = 1;
aU.Draw(aP, aJ, aR, aL);
aU.h = aI;
aU.w = aM;
return 1
}
;
x.DrawColour = function(aJ, aM, aK, aN, aI, i, aO, j, aL) {
if (aO.oimage) {
    if (this.pulse < 1) {
        aO.alpha = 1 - au(this.pulse, 2);
        aO.Draw(aJ, j, aL, aO.fimage);
        aO.alpha = this.pulse
    } else {
        aO.alpha = 1
    }
    aO.Draw(aJ, j, aL, aO.oimage);
    return 1
}
return this[aO.image ? "DrawColourImage" : "DrawColourText"](aJ, aM, aK, aN, aI, i, aO, j, aL)
}
;
x.DrawColourText = function(aK, aN, aL, aO, aI, i, aP, j, aM) {
var aJ = aP.colour;
aP.colour = i;
aP.alpha = 1;
aP.Draw(aK, j, aM);
aP.colour = aJ;
return 1
}
;
x.DrawColourImage = function(aN, aQ, aO, aR, aM, i, aU, j, aP) {
var aS = aN.canvas, aK = ~~s(aQ, 0), aJ = ~~s(aO, 0), aL = aE(aS.width - aK, aR) + 0.5 | 0, aT = aE(aS.height - aJ, aM) + 0.5 | 0, aI;
if (p) {
    p.width = aL,
    p.height = aT
} else {
    p = P(aL, aT)
}
if (!p) {
    return this.SetMethod("outline")
}
aI = p.getContext("2d");
aI.drawImage(aS, aK, aJ, aL, aT, 0, 0, aL, aT);
aN.clearRect(aK, aJ, aL, aT);
if (this.pulsate) {
    aU.alpha = 1 - au(this.pulse, 2)
} else {
    aU.alpha = 1
}
aU.Draw(aN, j, aP);
aN.setTransform(1, 0, 0, 1, 0, 0);
aN.save();
aN.beginPath();
aN.rect(aK, aJ, aL, aT);
aN.clip();
aN.globalCompositeOperation = "source-in";
aN.fillStyle = i;
aN.fillRect(aK, aJ, aL, aT);
aN.restore();
aN.globalAlpha = 1;
aN.globalCompositeOperation = "destination-over";
aN.drawImage(p, 0, 0, aL, aT, aK, aJ, aL, aT);
aN.globalCompositeOperation = "source-over";
return 1
}
;
x.DrawBlock = function(aM, i, aL, j, aI, aK) {
var aJ = aE(this.radius, aI / 2, j / 2);
aM.fillStyle = aK;
at(aM, i, aL, j, aI, aJ)
}
;
x.DrawSimple = function(aM, i, j, aJ, aL, aK) {
var aI = this.tc;
aM.setTransform(1, 0, 0, 1, 0, 0);
aM.strokeStyle = this.colour;
aM.lineWidth = aI.outlineThickness;
aM.shadowBlur = aM.shadowOffsetX = aM.shadowOffsetY = 0;
aM.globalAlpha = aK ? aL : 1;
return this.drawFunc(aM, this.x, this.y, this.w, this.h, this.colour, i, j, aJ)
}
;
x.DrawPulsate = function(aM, i, j, aJ) {
var aK = G() - this.ts
  , aI = this.tc
  , aL = aI.pulsateTo + ((1 - aI.pulsateTo) * (0.5 + (w(2 * Math.PI * aK / (1000 * aI.pulsateTime)) / 2)));
this.pulse = aL = y.Smooth(1, aL);
return this.DrawSimple(aM, i, j, aJ, aL, 1)
}
;
x.Active = function(aJ, i, aI) {
var j = (i >= this.x && aI >= this.y && i <= this.x + this.w && aI <= this.y + this.h);
if (j) {
    this.ts = this.ts || G()
} else {
    this.ts = null
}
return j
}
;
x.PreDraw = x.PostDraw = x.LastDraw = aB;
function e(aJ, aT, aP, aS, aQ, aK, aI, aM, aR, aL, aO, j, aN, i) {
this.tc = aJ;
this.image = null;
this.text = aT;
this.text_original = i;
this.line_widths = [];
this.title = aP.title || null;
this.a = aP;
this.position = new ae(aS[0],aS[1],aS[2]);
this.x = this.y = this.z = 0;
this.w = aQ;
this.h = aK;
this.colour = aI || aJ.textColour;
this.bgColour = aM || aJ.bgColour;
this.bgRadius = aR | 0;
this.bgOutline = aL || this.colour;
this.bgOutlineThickness = aO | 0;
this.textFont = j || aJ.textFont;
this.padding = aN | 0;
this.sc = this.alpha = 1;
this.weighted = !aJ.weight;
this.outline = new J(aJ,this)
}
c = e.prototype;
c.Init = function(j) {
var i = this.tc;
this.textHeight = i.textHeight;
if (this.HasText()) {
    this.Measure(i.ctxt, i)
} else {
    this.w = this.iw;
    this.h = this.ih
}
this.SetShadowColour = i.shadowAlpha ? this.SetShadowColourAlpha : this.SetShadowColourFixed;
this.SetDraw(i)
}
;
c.Draw = aB;
c.HasText = function() {
return this.text && this.text[0].length > 0
}
;
c.EqualTo = function(aI) {
var j = aI.getElementsByTagName("img");
if (this.a.href != aI.href) {
    return 0
}
if (j.length) {
    return this.image.src == j[0].src
}
return (aI.innerText || aI.textContent) == this.text_original
}
;
c.SetImage = function(j) {
this.image = this.fimage = j
}
;
c.SetDraw = function(i) {
this.Draw = this.fimage ? (i.ie > 7 ? this.DrawImageIE : this.DrawImage) : this.DrawText;
i.noSelect && (this.CheckActive = aB)
}
;
c.MeasureText = function(aL) {
var aJ, aI = this.text.length, j = 0, aK;
for (aJ = 0; aJ < aI; ++aJ) {
    this.line_widths[aJ] = aK = aL.measureText(this.text[aJ]).width;
    j = s(j, aK)
}
return j
}
;
c.Measure = function(aN, aQ) {
var aO = t(this.text, this.textFont, this.textHeight), aR, i, aK, j, aI, aM, aP, aJ, aL;
aP = aO ? aO.max.y + aO.min.y : this.textHeight;
aN.font = this.font = this.textHeight + "px " + this.textFont;
aM = this.MeasureText(aN);
if (aQ.txtOpt) {
    aR = aQ.txtScale;
    i = aR * this.textHeight;
    aK = i + "px " + this.textFont;
    j = [aR * aQ.shadowOffset[0], aR * aQ.shadowOffset[1]];
    aN.font = aK;
    aI = this.MeasureText(aN);
    aL = new g(this.text,aK,aI + aR,(aR * aP) + aR,aI,this.line_widths,aQ.textAlign,aQ.textVAlign,aR);
    if (this.image) {
        aL.SetImage(this.image, this.iw, this.ih, aQ.imagePosition, aQ.imagePadding, aQ.imageAlign, aQ.imageVAlign, aQ.imageScale)
    }
    aJ = aL.Create(this.colour, this.bgColour, this.bgOutline, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius);
    if (aQ.outlineMethod == "colour") {
        this.oimage = aL.Create(this.outline.colour, this.bgColour, this.outline.colour, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius)
    } else {
        if (aQ.outlineMethod == "size") {
            aO = t(this.text, this.textFont, this.textHeight + aQ.outlineIncrease);
            i = aO.max.y + aO.min.y;
            aK = (aR * (this.textHeight + aQ.outlineIncrease)) + "px " + this.textFont;
            aN.font = aK;
            aI = this.MeasureText(aN);
            aL = new g(this.text,aK,aI + aR,(aR * i) + aR,aI,this.line_widths,aQ.textAlign,aQ.textVAlign,aR);
            if (this.image) {
                aL.SetImage(this.image, this.iw + aQ.outlineIncrease, this.ih + aQ.outlineIncrease, aQ.imagePosition, aQ.imagePadding, aQ.imageAlign, aQ.imageVAlign, aQ.imageScale)
            }
            this.oimage = aL.Create(this.colour, this.bgColour, this.bgOutline, aR * this.bgOutlineThickness, aQ.shadow, aR * aQ.shadowBlur, j, aR * this.padding, aR * this.bgRadius);
            this.oscale = this.oimage.width / aJ.width;
            if (aQ.outlineIncrease > 0) {
                aJ = v(aJ, this.oimage.width, this.oimage.height)
            } else {
                this.oimage = v(this.oimage, aJ.width, aJ.height)
            }
        }
    }
    if (aJ) {
        this.fimage = aJ;
        aM = this.fimage.width / aR;
        aP = this.fimage.height / aR
    }
    this.SetDraw(aQ);
    aQ.txtOpt = !!this.fimage
}
this.h = aP;
this.w = aM
}
;
c.SetFont = function(j, aJ, aI, i) {
this.textFont = j;
this.colour = aJ;
this.bgColour = aI;
this.bgOutline = i;
this.Measure(this.tc.ctxt, this.tc)
}
;
c.SetWeight = function(aI) {
var j = this.tc, aK = j.weightMode.split(/[, ]/), i, aJ, aL = aI.length;
if (!this.HasText()) {
    return
}
this.weighted = true;
for (aJ = 0; aJ < aL; ++aJ) {
    i = aK[aJ] || "size";
    if ("both" == i) {
        this.Weight(aI[aJ], j.ctxt, j, "size", j.min_weight[aJ], j.max_weight[aJ], aJ);
        this.Weight(aI[aJ], j.ctxt, j, "colour", j.min_weight[aJ], j.max_weight[aJ], aJ)
    } else {
        this.Weight(aI[aJ], j.ctxt, j, i, j.min_weight[aJ], j.max_weight[aJ], aJ)
    }
}
this.Measure(j.ctxt, j)
}
;
c.Weight = function(aI, aN, aJ, j, aM, aK, aL) {
aI = isNaN(aI) ? 1 : aI;
var i = (aI - aM) / (aK - aM);
if ("colour" == j) {
    this.colour = k(aJ, i, aL)
} else {
    if ("bgcolour" == j) {
        this.bgColour = k(aJ, i, aL)
    } else {
        if ("bgoutline" == j) {
            this.bgOutline = k(aJ, i, aL)
        } else {
            if ("outline" == j) {
                this.outline.colour = k(aJ, i, aL)
            } else {
                if ("size" == j) {
                    if (aJ.weightSizeMin > 0 && aJ.weightSizeMax > aJ.weightSizeMin) {
                        this.textHeight = aJ.weightSize * (aJ.weightSizeMin + (aJ.weightSizeMax - aJ.weightSizeMin) * i)
                    } else {
                        this.textHeight = s(1, aI * aJ.weightSize)
                    }
                }
            }
        }
    }
}
}
;
c.SetShadowColourFixed = function(aI, j, i) {
aI.shadowColor = j
}
;
c.SetShadowColourAlpha = function(aI, j, i) {
aI.shadowColor = U(j, i)
}
;
c.DrawText = function(aK, aN, aJ) {
var aO = this.tc, aM = this.x, aL = this.y, aP = this.sc, j, aI;
aK.globalAlpha = this.alpha;
aK.fillStyle = this.colour;
aO.shadow && this.SetShadowColour(aK, aO.shadow, this.alpha);
aK.font = this.font;
aM += aN / aP;
aL += (aJ / aP) - (this.h / 2);
for (j = 0; j < this.text.length; ++j) {
    aI = aM;
    if ("right" == aO.textAlign) {
        aI += this.w / 2 - this.line_widths[j]
    } else {
        if ("centre" == aO.textAlign) {
            aI -= this.line_widths[j] / 2
        } else {
            aI -= this.w / 2
        }
    }
    aK.setTransform(aP, 0, 0, aP, aP * aI, aP * aL);
    aK.fillText(this.text[j], 0, 0);
    aL += this.textHeight
}
}
;
c.DrawImage = function(aK, aR, aJ, aM) {
var aO = this.x
  , aL = this.y
  , aS = this.sc
  , j = aM || this.fimage
  , aP = this.w
  , aI = this.h
  , aN = this.alpha
  , aQ = this.shadow;
aK.globalAlpha = aN;
aQ && this.SetShadowColour(aK, aQ, aN);
aO += (aR / aS) - (aP / 2);
aL += (aJ / aS) - (aI / 2);
aK.setTransform(aS, 0, 0, aS, aS * aO, aS * aL);
aK.drawImage(j, 0, 0, aP, aI)
}
;
c.DrawImageIE = function(aK, aO, aJ) {
var j = this.fimage
  , aP = this.sc
  , aN = j.width = this.w * aP
  , aI = j.height = this.h * aP
  , aM = (this.x * aP) + aO - (aN / 2)
  , aL = (this.y * aP) + aJ - (aI / 2);
aK.setTransform(1, 0, 0, 1, 0, 0);
aK.globalAlpha = this.alpha;
aK.drawImage(j, aM, aL)
}
;
c.Calc = function(i, aI) {
var j, aL = this.tc, aK = aL.minBrightness, aJ = aL.maxBrightness, aM = aL.max_radius;
j = i.xform(this.position);
this.xformed = j;
j = V(aL, j, aL.stretchX, aL.stretchY);
this.x = j.x;
this.y = j.y;
this.z = j.z;
this.sc = j.w;
this.alpha = aI * aw(aK + (aJ - aK) * (aM - this.z) / (2 * aM), 0, 1);
return this.xformed
}
;
c.UpdateActive = function(aN, aI, aL) {
var aK = this.outline
  , j = this.w
  , aJ = this.h
  , i = this.x - j / 2
  , aM = this.y - aJ / 2;
aK.Update(i, aM, j, aJ, this.sc, this.z, aI, aL);
return aK
}
;
c.CheckActive = function(aK, i, aJ) {
var j = this.tc
  , aI = this.UpdateActive(aK, i, aJ);
return aI.Active(aK, j.mx, j.my) ? aI : null
}
;
c.Clicked = function(aL) {
var j = this.a, aI = j.target, aJ = j.href, i;
if (aI != "" && aI != "_self") {
    if (self.frames[aI]) {
        self.frames[aI].document.location = aJ
    } else {
        try {
            if (top.frames[aI]) {
                top.frames[aI].document.location = aJ;
                return
            }
        } catch (aK) {}
        window.open(aJ, aI)
    }
    return
}
if (C.createEvent) {
    i = C.createEvent("MouseEvents");
    i.initMouseEvent("click", 1, 1, window, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, null);
    if (!j.dispatchEvent(i)) {
        return
    }
} else {
    if (j.fireEvent) {
        if (!j.fireEvent("onclick")) {
            return
        }
    }
}
C.location = aJ
}
;
function y(aO, j, aJ) {
var aI, aL, aN = C.getElementById(aO), aK = ["id", "class", "innerHTML"], aM;
if (!aN) {
    throw 0
}
if (ai(window.G_vmlCanvasManager)) {
    aN = window.G_vmlCanvasManager.initElement(aN);
    this.ie = parseFloat(navigator.appVersion.split("MSIE")[1])
}
if (aN && (!aN.getContext || !aN.getContext("2d").fillText)) {
    aL = C.createElement("DIV");
    for (aI = 0; aI < aK.length; ++aI) {
        aL[aK[aI]] = aN[aK[aI]]
    }
    aN.parentNode.insertBefore(aL, aN);
    aN.parentNode.removeChild(aN);
    throw 0
}
for (aI in y.options) {
    this[aI] = aJ && ai(aJ[aI]) ? aJ[aI] : (ai(y[aI]) ? y[aI] : y.options[aI])
}
this.canvas = aN;
this.ctxt = aN.getContext("2d");
this.z1 = 250 / s(this.depth, 0.001);
this.z2 = this.z1 / this.zoom;
this.radius = aE(aN.height, aN.width) * 0.0075;
this.max_radius = 100;
this.max_weight = [];
this.min_weight = [];
this.textFont = this.textFont && o(this.textFont);
this.textHeight *= 1;
this.imageRadius = this.imageRadius.toString();
this.pulsateTo = aw(this.pulsateTo, 0, 1);
this.minBrightness = aw(this.minBrightness, 0, 1);
this.maxBrightness = aw(this.maxBrightness, this.minBrightness, 1);
this.ctxt.textBaseline = "top";
this.lx = (this.lock + "").indexOf("x") + 1;
this.ly = (this.lock + "").indexOf("y") + 1;
this.frozen = this.dx = this.dy = this.fixedAnim = this.touchState = 0;
this.fixedAlpha = 1;
this.source = j || aO;
this.repeatTags = aE(64, ~~this.repeatTags);
this.minTags = aE(200, ~~this.minTags);
if (~~this.scrollPause > 0) {
    y.scrollPause = ~~this.scrollPause
} else {
    this.scrollPause = 0
}
if (this.minTags > 0 && this.repeatTags < 1 && (aI = this.GetTags().length)) {
    this.repeatTags = aq(this.minTags / aI) - 1
}
this.transform = R.Identity();
this.startTime = this.time = G();
this.mx = this.my = -1;
this.centreImage && ao(this);
this.Animate = this.dragControl ? this.AnimateDrag : this.AnimatePosition;
this.animTiming = (typeof y[this.animTiming] == "function" ? y[this.animTiming] : y.Smooth);
if (this.shadowBlur || this.shadowOffset[0] || this.shadowOffset[1]) {
    this.ctxt.shadowColor = this.shadow;
    this.shadow = this.ctxt.shadowColor;
    this.shadowAlpha = al()
} else {
    delete this.shadow
}
this.Load();
if (j && this.hideTags) {
    (function(i) {
        if (y.loaded) {
            i.HideTags()
        } else {
            ad("load", function() {
                i.HideTags()
            }, window)
        }
    }
    )(this)
}
this.yaw = this.initial ? this.initial[0] * this.maxSpeed : 0;
this.pitch = this.initial ? this.initial[1] * this.maxSpeed : 0;
if (this.tooltip) {
    this.ctitle = aN.title;
    aN.title = "";
    if (this.tooltip == "native") {
        this.Tooltip = this.TooltipNative
    } else {
        this.Tooltip = this.TooltipDiv;
        if (!this.ttdiv) {
            this.ttdiv = C.createElement("div");
            this.ttdiv.className = this.tooltipClass;
            this.ttdiv.style.position = "absolute";
            this.ttdiv.style.zIndex = aN.style.zIndex + 1;
            ad("mouseover", function(i) {
                i.target.style.display = "none"
            }, this.ttdiv);
            C.body.appendChild(this.ttdiv)
        }
    }
} else {
    this.Tooltip = this.TooltipNone
}
if (!this.noMouse && !b[aO]) {
    b[aO] = [["mousemove", af], ["mouseout", B], ["mouseup", aF], ["touchstart", T], ["touchend", r], ["touchcancel", r], ["touchmove", aA]];
    if (this.dragControl) {
        b[aO].push(["mousedown", z]);
        b[aO].push(["selectstart", aB])
    }
    if (this.wheelZoom) {
        b[aO].push(["mousewheel", ag]);
        b[aO].push(["DOMMouseScroll", ag])
    }
    if (this.scrollPause) {
        b[aO].push(["scroll", ac, window])
    }
    for (aI = 0; aI < b[aO].length; ++aI) {
        aL = b[aO][aI];
        ad(aL[0], aL[1], aL[2] ? aL[2] : aN)
    }
}
if (!y.started) {
    aM = window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
    y.NextFrame = aM ? y.NextFrameRAF : y.NextFrameTimeout;
    y.interval = this.interval;
    y.NextFrame(this.interval);
    y.started = 1
}
}
Q = y.prototype;
Q.SourceElements = function() {
if (C.querySelectorAll) {
    return C.querySelectorAll("#" + this.source)
}
return [C.getElementById(this.source)]
}
;
Q.HideTags = function() {
var aI = this.SourceElements(), j;
for (j = 0; j < aI.length; ++j) {
    aI[j].style.display = "none"
}
}
;
Q.GetTags = function() {
var aN = this.SourceElements(), aM, aJ = [], aL, aK, aI;
for (aI = 0; aI <= this.repeatTags; ++aI) {
    for (aL = 0; aL < aN.length; ++aL) {
        aM = aN[aL].getElementsByTagName("a");
        for (aK = 0; aK < aM.length; ++aK) {
            aJ.push(aM[aK])
        }
    }
}
return aJ
}
;
Q.Message = function(aN) {
var aP = [], aJ, j, aI = aN.split(""), aL, aO, aM, aK;
for (aJ = 0; aJ < aI.length; ++aJ) {
    if (aI[aJ] != " ") {
        j = aJ - aI.length / 2;
        aL = C.createElement("A");
        aL.href = "#";
        aL.innerText = aI[aJ];
        aM = 100 * ah(j / 9);
        aK = -100 * w(j / 9);
        aO = new e(this,aI[aJ],aL,[aM, 0, aK],2,18,"#000","#fff",0,0,0,"monospace",2,aI[aJ]);
        aO.Init();
        aP.push(aO)
    }
}
return aP
}
;
Q.CreateTag = function(aM) {
var aP, aK, aQ, aL, aO, aI, aN, aJ, j = [0, 0, 0];
if ("text" != this.imageMode) {
    aP = aM.getElementsByTagName("img");
    if (aP.length) {
        aK = new Image;
        aK.src = aP[0].src;
        if (!this.imageMode) {
            aQ = new e(this,"",aM,j,0,0);
            aQ.SetImage(aK);
            ax(aK, aP[0], aQ, this);
            return aQ
        }
    }
}
if ("image" != this.imageMode) {
    aO = new aC(aM);
    aL = aO.Lines();
    if (!aO.Empty()) {
        aI = this.textFont || o(Y(aM, "font-family"));
        if (this.splitWidth) {
            aL = aO.SplitWidth(this.splitWidth, this.ctxt, aI, this.textHeight)
        }
        aN = this.bgColour == "tag" ? Y(aM, "background-color") : this.bgColour;
        aJ = this.bgOutline == "tag" ? Y(aM, "color") : this.bgOutline
    } else {
        aO = null
    }
}
if (aO || aK) {
    aQ = new e(this,aL,aM,j,2,this.textHeight + 2,this.textColour || Y(aM, "color"),aN,this.bgRadius,aJ,this.bgOutlineThickness,aI,this.padding,aO && aO.original);
    if (aK) {
        aQ.SetImage(aK);
        ax(aK, aP[0], aQ, this)
    } else {
        aQ.Init()
    }
    return aQ
}
}
;
Q.UpdateTag = function(aI, i) {
var aL = this.textColour || Y(i, "color")
  , j = this.textFont || o(Y(i, "font-family"))
  , aK = this.bgColour == "tag" ? Y(i, "background-color") : this.bgColour
  , aJ = this.bgOutline == "tag" ? Y(i, "color") : this.bgOutline;
aI.a = i;
aI.title = i.title;
if (aI.colour != aL || aI.textFont != j || aI.bgColour != aK || aI.bgOutline != aJ) {
    aI.SetFont(j, aL, aK, aJ)
}
}
;
Q.Weight = function(aO) {
var aK = aO.length, aM, aI, aP, aL = [], j, aJ = this.weightFrom ? this.weightFrom.split(/[, ]/) : [null], aN = aJ.length;
for (aI = 0; aI < aK; ++aI) {
    aL[aI] = [];
    for (aP = 0; aP < aN; ++aP) {
        aM = u(aO[aI].a, aJ[aP], this.textHeight);
        if (!this.max_weight[aP] || aM > this.max_weight[aP]) {
            this.max_weight[aP] = aM
        }
        if (!this.min_weight[aP] || aM < this.min_weight[aP]) {
            this.min_weight[aP] = aM
        }
        aL[aI][aP] = aM
    }
}
for (aP = 0; aP < aN; ++aP) {
    if (this.max_weight[aP] > this.min_weight[aP]) {
        j = 1
    }
}
if (j) {
    for (aI = 0; aI < aK; ++aI) {
        aO[aI].SetWeight(aL[aI])
    }
}
}
;
Q.Load = function() {
var aS = this.GetTags(), aN = [], aQ, aR, aM, aJ, aI, j, aK, aP, aL = [], aO = {
    sphere: q,
    vcylinder: am,
    hcylinder: av,
    vring: d,
    hring: n
};
if (aS.length) {
    aL.length = aS.length;
    for (aP = 0; aP < aS.length; ++aP) {
        aL[aP] = aP
    }
    this.shuffleTags && an(aL);
    aJ = 100 * this.radiusX;
    aI = 100 * this.radiusY;
    j = 100 * this.radiusZ;
    this.max_radius = s(aJ, s(aI, j));
    for (aP = 0; aP < aS.length; ++aP) {
        aR = this.CreateTag(aS[aL[aP]]);
        if (aR) {
            aN.push(aR)
        }
    }
    this.weight && this.Weight(aN, true);
    if (this.shapeArgs) {
        this.shapeArgs[0] = aN.length
    } else {
        aM = this.shape.toString().split(/[(),]/);
        aQ = aM.shift();
        if (typeof window[aQ] === "function") {
            this.shape = window[aQ]
        } else {
            this.shape = aO[aQ] || aO.sphere
        }
        this.shapeArgs = [aN.length, aJ, aI, j].concat(aM)
    }
    aK = this.shape.apply(this, this.shapeArgs);
    this.listLength = aN.length;
    for (aP = 0; aP < aN.length; ++aP) {
        aN[aP].position = new ae(aK[aP][0],aK[aP][1],aK[aP][2])
    }
}
if (this.noTagsMessage && !aN.length) {
    aP = (this.imageMode && this.imageMode != "both" ? this.imageMode + " " : "");
    aN = this.Message("No " + aP + "tags")
}
this.taglist = aN
}
;
Q.Update = function() {
var aR = this.GetTags(), aQ = [], aL = this.taglist, aS, aP = [], aN = [], aJ, aO, aI, aM, aK;
if (!this.shapeArgs) {
    return this.Load()
}
if (aR.length) {
    aI = this.listLength = aR.length;
    aO = aL.length;
    for (aM = 0; aM < aO; ++aM) {
        aQ.push(aL[aM]);
        aN.push(aM)
    }
    for (aM = 0; aM < aI; ++aM) {
        for (aK = 0,
        aS = 0; aK < aO; ++aK) {
            if (aL[aK].EqualTo(aR[aM])) {
                this.UpdateTag(aQ[aK], aR[aM]);
                aS = aN[aK] = -1
            }
        }
        if (!aS) {
            aP.push(aM)
        }
    }
    for (aM = 0,
    aK = 0; aM < aO; ++aM) {
        if (aN[aK] == -1) {
            aN.splice(aK, 1)
        } else {
            ++aK
        }
    }
    if (aN.length) {
        an(aN);
        while (aN.length && aP.length) {
            aM = aN.shift();
            aK = aP.shift();
            aQ[aM] = this.CreateTag(aR[aK])
        }
        aN.sort(function(j, i) {
            return j - i
        });
        while (aN.length) {
            aQ.splice(aN.pop(), 1)
        }
    }
    aK = aQ.length / (aP.length + 1);
    aM = 0;
    while (aP.length) {
        aQ.splice(aq(++aM * aK), 0, this.CreateTag(aR[aP.shift()]))
    }
    this.shapeArgs[0] = aI = aQ.length;
    aJ = this.shape.apply(this, this.shapeArgs);
    for (aM = 0; aM < aI; ++aM) {
        aQ[aM].position = new ae(aJ[aM][0],aJ[aM][1],aJ[aM][2])
    }
    this.weight && this.Weight(aQ)
}
this.taglist = aQ
}
;
Q.SetShadow = function(i) {
i.shadowBlur = this.shadowBlur;
i.shadowOffsetX = this.shadowOffset[0];
i.shadowOffsetY = this.shadowOffset[1]
}
;
Q.Draw = function(aS) {
if (this.paused) {
    return
}
var aM = this.canvas, aK = aM.width, aR = aM.height, aU = 0, aJ = (aS - this.time) * y.interval / 1000, aQ = aK / 2 + this.offsetX, aP = aR / 2 + this.offsetY, aY = this.ctxt, aO, aZ, aW, aI = -1, aL = this.taglist, aV = aL.length, j = this.frontSelect, aT = (this.centreFunc == aB), aN;
this.time = aS;
if (this.frozen && this.drawn) {
    return this.Animate(aK, aR, aJ)
}
aN = this.AnimateFixed();
aY.setTransform(1, 0, 0, 1, 0, 0);
for (aW = 0; aW < aV; ++aW) {
    aL[aW].Calc(this.transform, this.fixedAlpha)
}
aL = A(aL, function(a0, i) {
    return i.z - a0.z
});
if (aN && this.fixedAnim.active) {
    aO = this.fixedAnim.tag.UpdateActive(aY, aQ, aP)
} else {
    this.active = null;
    for (aW = 0; aW < aV; ++aW) {
        aZ = this.mx >= 0 && this.my >= 0 && this.taglist[aW].CheckActive(aY, aQ, aP);
        if (aZ && aZ.sc > aU && (!j || aZ.z <= 0)) {
            aO = aZ;
            aI = aW;
            aO.tag = this.taglist[aW];
            aU = aZ.sc
        }
    }
    this.active = aO
}
this.txtOpt || (this.shadow && this.SetShadow(aY));
aY.clearRect(0, 0, aK, aR);
for (aW = 0; aW < aV; ++aW) {
    if (!aT && aL[aW].z <= 0) {
        try {
            this.centreFunc(aY, aK, aR, aQ, aP)
        } catch (aX) {
            alert(aX);
            this.centreFunc = aB
        }
        aT = true
    }
    if (!(aO && aO.tag == aL[aW] && aO.PreDraw(aY, aL[aW], aQ, aP))) {
        aL[aW].Draw(aY, aQ, aP)
    }
    aO && aO.tag == aL[aW] && aO.PostDraw(aY)
}
if (this.freezeActive && aO) {
    this.Freeze()
} else {
    this.UnFreeze();
    this.drawn = (aV == this.listLength)
}
if (this.fixedCallback) {
    this.fixedCallback(this, this.fixedCallbackTag);
    this.fixedCallback = null
}
aN || this.Animate(aK, aR, aJ);
aO && aO.LastDraw(aY);
aM.style.cursor = aO ? this.activeCursor : "";
this.Tooltip(aO, this.taglist[aI])
}
;
Q.TooltipNone = function() {}
;
Q.TooltipNative = function(j, i) {
if (j) {
    this.canvas.title = i && i.title ? i.title : ""
} else {
    this.canvas.title = this.ctitle
}
}
;
Q.SetTTDiv = function(aJ, j) {
var i = this
  , aI = i.ttdiv.style;
if (aJ != i.ttdiv.innerHTML) {
    aI.display = "none"
}
i.ttdiv.innerHTML = aJ;
j && (j.title = i.ttdiv.innerHTML);
if (aI.display == "none" && !i.tttimer) {
    i.tttimer = setTimeout(function() {
        var aK = ab(i.canvas.id);
        aI.display = "block";
        aI.left = aK.x + i.mx + "px";
        aI.top = aK.y + i.my + 24 + "px";
        i.tttimer = null
    }, i.tooltipDelay)
}
}
;
Q.TooltipDiv = function(j, i) {
if (j && i && i.title) {
    this.SetTTDiv(i.title, i)
} else {
    if (!j && this.mx != -1 && this.my != -1 && this.ctitle.length) {
        this.SetTTDiv(this.ctitle)
    } else {
        this.ttdiv.style.display = "none"
    }
}
}
;
Q.Transform = function(aL, i, aN) {
if (i || aN) {
    var j = ah(i)
      , aM = w(i)
      , aO = ah(aN)
      , aK = w(aN)
      , aI = new R([aK, 0, aO, 0, 1, 0, -aO, 0, aK])
      , aJ = new R([1, 0, 0, 0, aM, -j, 0, j, aM]);
    aL.transform = aL.transform.mul(aI.mul(aJ))
}
}
;
Q.AnimateFixed = function() {
var aI, j, aK, i, aJ;
if (this.fadeIn) {
    j = G() - this.startTime;
    if (j >= this.fadeIn) {
        this.fadeIn = 0;
        this.fixedAlpha = 1
    } else {
        this.fixedAlpha = j / this.fadeIn
    }
}
if (this.fixedAnim) {
    if (!this.fixedAnim.transform) {
        this.fixedAnim.transform = this.transform
    }
    aI = this.fixedAnim,
    j = G() - aI.t0,
    aK = aI.angle,
    i,
    aJ = this.animTiming(aI.t, j);
    this.transform = aI.transform;
    if (j >= aI.t) {
        this.fixedCallbackTag = aI.tag;
        this.fixedCallback = aI.cb;
        this.fixedAnim = this.yaw = this.pitch = 0
    } else {
        aK *= aJ
    }
    i = R.Rotation(aK, aI.axis);
    this.transform = this.transform.mul(i);
    return (this.fixedAnim != 0)
}
return false
}
;
Q.AnimatePosition = function(aI, aL, aJ) {
var j = this, i = j.mx, aN = j.my, aK, aM;
if (!j.frozen && i >= 0 && aN >= 0 && i < aI && aN < aL) {
    aK = j.maxSpeed,
    aM = j.reverse ? -1 : 1;
    j.lx || (j.yaw = ((i * 2 * aK / aI) - aK) * aM * aJ);
    j.ly || (j.pitch = ((aN * 2 * aK / aL) - aK) * -aM * aJ);
    j.initial = null
} else {
    if (!j.initial) {
        if (j.frozen && !j.freezeDecel) {
            j.yaw = j.pitch = 0
        } else {
            j.Decel(j)
        }
    }
}
this.Transform(j, j.pitch, j.yaw)
}
;
Q.AnimateDrag = function(j, aK, aJ) {
var i = this
  , aI = 100 * aJ * i.maxSpeed / i.max_radius / i.zoom;
if (i.dx || i.dy) {
    i.lx || (i.yaw = i.dx * aI / i.stretchX);
    i.ly || (i.pitch = i.dy * -aI / i.stretchY);
    i.dx = i.dy = 0;
    i.initial = null
} else {
    if (!i.initial) {
        i.Decel(i)
    }
}
this.Transform(i, i.pitch, i.yaw)
}
;
Q.Freeze = function() {
if (!this.frozen) {
    this.preFreeze = [this.yaw, this.pitch];
    this.frozen = 1;
    this.drawn = 0
}
}
;
Q.UnFreeze = function() {
if (this.frozen) {
    this.yaw = this.preFreeze[0];
    this.pitch = this.preFreeze[1];
    this.frozen = 0
}
}
;
Q.Decel = function(i) {
var aI = i.minSpeed
  , aJ = L(i.yaw)
  , j = L(i.pitch);
if (!i.lx && aJ > aI) {
    i.yaw = aJ > i.z0 ? i.yaw * i.decel : 0
}
if (!i.ly && j > aI) {
    i.pitch = j > i.z0 ? i.pitch * i.decel : 0
}
}
;
Q.Zoom = function(i) {
this.z2 = this.z1 * (1 / i);
this.drawn = 0
}
;
Q.Clicked = function(aI) {
var i = this.active;
try {
    if (i && i.tag) {
        if (this.clickToFront === false || this.clickToFront === null) {
            i.tag.Clicked(aI)
        } else {
            this.TagToFront(i.tag, this.clickToFront, function() {
                i.tag.Clicked(aI)
            }, true)
        }
    }
} catch (j) {}
}
;
Q.Wheel = function(j) {
var aI = this.zoom + this.zoomStep * (j ? 1 : -1);
this.zoom = aE(this.zoomMax, s(this.zoomMin, aI));
this.Zoom(this.zoom)
}
;
Q.BeginDrag = function(i) {
this.down = S(i, this.canvas);
i.cancelBubble = true;
i.returnValue = false;
i.preventDefault && i.preventDefault()
}
;
Q.Drag = function(aK, aJ) {
if (this.dragControl && this.down) {
    var aI = this.dragThreshold * this.dragThreshold
      , j = aJ.x - this.down.x
      , i = aJ.y - this.down.y;
    if (this.dragging || j * j + i * i > aI) {
        this.dx = j;
        this.dy = i;
        this.dragging = 1;
        this.down = aJ
    }
}
return this.dragging
}
;
Q.EndDrag = function() {
var i = this.dragging;
this.dragging = this.down = null;
return i
}
;
function D(aI) {
var j = aI.targetTouches[0]
  , i = aI.targetTouches[1];
return F(au(i.pageX - j.pageX, 2) + au(i.pageY - j.pageY, 2))
}
Q.BeginPinch = function(i) {
this.pinched = [D(i), this.zoom];
i.preventDefault && i.preventDefault()
}
;
Q.Pinch = function(j) {
var aJ, aI, i = this.pinched;
if (!i) {
    return
}
aI = D(j);
aJ = i[1] * aI / i[0];
this.zoom = aE(this.zoomMax, s(this.zoomMin, aJ));
this.Zoom(this.zoom)
}
;
Q.EndPinch = function(i) {
this.pinched = null
}
;
Q.Pause = function() {
this.paused = true
}
;
Q.Resume = function() {
this.paused = false
}
;
Q.SetSpeed = function(j) {
this.initial = j;
this.yaw = j[0] * this.maxSpeed;
this.pitch = j[1] * this.maxSpeed
}
;
Q.FindTag = function(aI) {
if (!ai(aI)) {
    return null
}
ai(aI.index) && (aI = aI.index);
if (!I(aI)) {
    return this.taglist[aI]
}
var aJ, aK, j;
if (ai(aI.id)) {
    aJ = "id",
    aK = aI.id
} else {
    if (ai(aI.text)) {
        aJ = "innerText",
        aK = aI.text
    }
}
for (j = 0; j < this.taglist.length; ++j) {
    if (this.taglist[j].a[aJ] == aK) {
        return this.taglist[j]
    }
}
}
;
Q.RotateTag = function(aQ, aJ, aP, i, aN, aI) {
var aO = aQ.Calc(this.transform, 1)
  , aL = new ae(aO.x,aO.y,aO.z)
  , aK = aj(aP, aJ)
  , j = aL.angle(aK)
  , aM = aL.cross(aK).unit();
if (j == 0) {
    this.fixedCallbackTag = aQ;
    this.fixedCallback = aN
} else {
    this.fixedAnim = {
        angle: -j,
        axis: aM,
        t: i,
        t0: G(),
        cb: aN,
        tag: aQ,
        active: aI
    }
}
}
;
Q.TagToFront = function(i, aI, aJ, j) {
this.RotateTag(i, 0, 0, aI, aJ, j)
}
;
y.Start = function(aI, i, j) {
y.Delete(aI);
y.tc[aI] = new y(aI,i,j)
}
;
function az(i, j) {
y.tc[j] && y.tc[j][i]()
}
y.Linear = function(i, j) {
return j / i
}
;
y.Smooth = function(i, j) {
return 0.5 - w(j * Math.PI / i) / 2
}
;
y.Pause = function(i) {
az("Pause", i)
}
;
y.Resume = function(i) {
az("Resume", i)
}
;
y.Reload = function(i) {
az("Load", i)
}
;
y.Update = function(i) {
az("Update", i)
}
;
y.SetSpeed = function(j, i) {
if (I(i) && y.tc[j] && !isNaN(i[0]) && !isNaN(i[1])) {
    y.tc[j].SetSpeed(i);
    return true
}
return false
}
;
y.TagToFront = function(j, i) {
if (!I(i)) {
    return false
}
i.lat = i.lng = 0;
return y.RotateTag(j, i)
}
;
y.RotateTag = function(aI, i) {
if (I(i) && y.tc[aI]) {
    if (isNaN(i.time)) {
        i.time = 500
    }
    var j = y.tc[aI].FindTag(i);
    if (j) {
        y.tc[aI].RotateTag(j, i.lat, i.lng, i.time, i.callback, i.active);
        return true
    }
}
return false
}
;
y.Delete = function(aJ) {
var j, aI;
if (b[aJ]) {
    aI = C.getElementById(aJ);
    if (aI) {
        for (j = 0; j < b[aJ].length; ++j) {
            a(b[aJ][j][0], b[aJ][j][1], aI)
        }
    }
}
delete b[aJ];
delete y.tc[aJ]
}
;
y.NextFrameRAF = function() {
requestAnimationFrame(E)
}
;
y.NextFrameTimeout = function(i) {
setTimeout(O, i)
}
;
y.tc = {};
y.options = {
z1: 20000,
z2: 20000,
z0: 0.0002,
freezeActive: false,
freezeDecel: false,
activeCursor: "pointer",
pulsateTo: 1,
pulsateTime: 3,
reverse: false,
depth: 0.5,
maxSpeed: 0.05,
minSpeed: 0,
decel: 0.95,
interval: 20,
minBrightness: 0.1,
maxBrightness: 1,
outlineColour: "#ffff99",
outlineThickness: 2,
outlineOffset: 5,
outlineMethod: "outline",
outlineRadius: 0,
textColour: "#ff99ff",
textHeight: 15,
textFont: "'Inter', sans-serif",
shadow: "#000",
shadowBlur: 0,
shadowOffset: [0, 0],
initial: null,
hideTags: true,
zoom: 1,
weight: false,
weightMode: "size",
weightFrom: null,
weightSize: 1,
weightSizeMin: null,
weightSizeMax: null,
weightGradient: {
    0: "#f00",
    0.33: "#ff0",
    0.66: "#0f0",
    1: "#00f"
},
txtOpt: true,
txtScale: 2,
frontSelect: false,
wheelZoom: true,
zoomMin: 0.3,
zoomMax: 3,
zoomStep: 0.05,
shape: "sphere",
lock: null,
tooltip: null,
tooltipDelay: 300,
tooltipClass: "tctooltip",
radiusX: 1,
radiusY: 1,
radiusZ: 1,
stretchX: 1,
stretchY: 1,
offsetX: 0,
offsetY: 0,
shuffleTags: false,
noSelect: false,
noMouse: false,
imageScale: 1,
paused: false,
dragControl: false,
dragThreshold: 4,
centreFunc: aB,
splitWidth: 0,
animTiming: "Smooth",
clickToFront: false,
fadeIn: 0,
padding: 0,
bgColour: null,
bgRadius: 0,
bgOutline: null,
bgOutlineThickness: 0,
outlineIncrease: 4,
textAlign: "centre",
textVAlign: "middle",
imageMode: null,
imagePosition: null,
imagePadding: 2,
imageAlign: "centre",
imageVAlign: "middle",
noTagsMessage: true,
centreImage: null,
pinchZoom: false,
repeatTags: 0,
minTags: 0,
imageRadius: 0,
scrollPause: false,
outlineDash: 0,
outlineDashSpace: 0,
outlineDashSpeed: 1
};
for (M in y.options) {
y[M] = y.options[M]
}
window.TagCanvas = y;
jQuery.fn.tagcanvas = function(j, i) {
var aI = {
    pause: function() {
        ap(this).each(function() {
            az("Pause", ap(this)[0].id)
        })
    },
    resume: function() {
        ap(this).each(function() {
            az("Resume", ap(this)[0].id)
        })
    },
    reload: function() {
        ap(this).each(function() {
            az("Load", ap(this)[0].id)
        })
    },
    update: function() {
        ap(this).each(function() {
            az("Update", ap(this)[0].id)
        })
    },
    tagtofront: function() {
        ap(this).each(function() {
            y.TagToFront(ap(this)[0].id, i)
        })
    },
    rotatetag: function() {
        ap(this).each(function() {
            y.RotateTag(ap(this)[0].id, i)
        })
    },
    "delete": function() {
        ap(this).each(function() {
            y.Delete(ap(this)[0].id)
        })
    },
    setspeed: function() {
        ap(this).each(function() {
            y.SetSpeed(ap(this)[0].id, i)
        })
    }
};
if (typeof j == "string" && aI[j]) {
    aI[j].apply(this);
    return this
} else {
    y.jquery = 1;
    ap(this).each(function() {
        y.Start(ap(this)[0].id, i, j)
    });
    return y.started
}
}
;
ad("load", function() {
y.loaded = 1
}, window)
}
)(jQuery);

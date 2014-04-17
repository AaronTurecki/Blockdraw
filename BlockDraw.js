/**
 * @projectDescription Simple block drawing web application created using
 * Palette and BlockCanvas
 * @author aaronTurecki
 * @version $Revision: 761 $
 * $Date: 2013-11-20 10:50:59 -0800 (Wed, 20 Nov 2013) $
 */
function main(){
	var palette = new Palette(document.getElementById("colorDiv"));
	var blockCanvas = new BlockCanvas(document.getElementById("canvasDiv"),palette.getColor.bind(palette));
    document.getElementById("reset").addEventListener("click",blockCanvas.reset.bind(blockCanvas));
    document.getElementById("reset").addEventListener("click",palette.reset.bind(palette));
}

//Register the main function to run when Document Content has loaded.
window.addEventListener("DOMContentLoaded",main,false);

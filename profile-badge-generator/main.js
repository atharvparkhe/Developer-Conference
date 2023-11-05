const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let image = "";
let shape = "original";
document.getElementById("download").style.visibility = "hidden";

const uploadImage = () => {
    document.querySelector("input.profile-input").click();
    document.getElementById("download").style.visibility = "visible";
};

const changeShape = (type) => {
    const original = document.querySelector(".select-container .select#original");
    const square = document.querySelector(".select-container .select#square");
    shape = type;
    switch (type) {
        case "original":
            {
                original.setAttribute("selected", "");
                square.removeAttribute("selected");
                break;
            }
        case "square":
            {
                square.setAttribute("selected", "");
                original.removeAttribute("selected");
                break;
            }
    }
    draw();
};

const upload = (e) => {
    if (e && e.target.files && e.target.files[0]) {
        const reader = new FileReader();
        reader.onload = (event) => {
            const img = new Image();
            img.onload = () => {
                image = img;
                draw();
            };
            img.src = event.target.result;
        };
        reader.readAsDataURL(e.target.files[0]);
    }
};

const banner = new Image();
banner.src = "image/Banner.jpeg";
banner.onload = () => {
    draw();
};

const draw = () => {
    if (image) {
        switch (shape) {
            case "original":
                {
                    if (image.height > image.width) {
                        const ratio = image.width / 1500;
                        canvas.width = 1500;
                        canvas.height = image.height / ratio;
                        ctx.strokeStyle = "black"; // You can set the border color
                        ctx.lineWidth = 20; // You can set the border width
                        ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    } else {

                        const ratio = image.width / 1500;
                        canvas.width = 1500;
                        canvas.height = image.height / ratio;
                        ctx.strokeStyle = "black"; // You can set the border color
                        ctx.lineWidth = 10; // You can set the border width
                        ctx.strokeRect(0, 0, canvas.width, canvas.height);

                    } ctx.drawImage(image, 5, 5, canvas.width - 10, canvas.height - 10);
                    break;
                }
            default:
                {
                    const size = Math.min(image.width, image.height);
                    canvas.width = 1500;
                    canvas.height = 1500;
                    const hRatio = canvas.width / image.width;
                    const vRatio = canvas.height / image.height;
                    const ratio = Math.max(hRatio, vRatio);
                    const x = (canvas.width - image.width * ratio) / 2;
                    const y = (canvas.height - image.height * ratio) / 2;

                    ctx.drawImage(image, 0, 0, image.width - 100, image.height - 100, x, y, image.width * ratio, image.height * ratio);
                    ctx.strokeStyle = "black"; // You can set the border color
                    ctx.lineWidth = 10; // You can set the border width
                    ctx.strokeRect(0, 0, canvas.width, canvas.height);
                    break;
                }
        }
    } else {
        ctx.canvas.width = 1500;
        ctx.canvas.height = 1500;
        ctx.fillStyle = "#205eb2";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = "black"; // You can set the border color
        ctx.lineWidth = 10; // You can set the border width
        ctx.strokeRect(0, 0, canvas.width, canvas.height);
    }

    const height = (banner.height / banner.width) * canvas.width;
    const y = canvas.height - height - 5;
    const fontSize = canvas.width / 17.2;
    const fontY = y + height * 0.7;
    ctx.drawImage(banner, 0, 0, banner.width, banner.height, 5, y, canvas.width-10, height);
};

const download = () => {
    const a = document.createElement("a");
    const url = canvas.toDataURL("image/png;base64");
    a.download = "badge.png";
    a.href = url;

    a.click();
};

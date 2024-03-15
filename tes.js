const pdf2img = require('pdf-img-convert');
const imageToSlices = require('image-to-slices');
const sizeOf = require('image-size');
const fs = require('fs').promises;
const Canvas = require('canvas');

async function convertAndSlicePDF(pdfPath) {
    try {
        const outputImages = await pdf2img.convert(pdfPath);
        for (let i = 0; i < outputImages.length; i++) {
            const imagePath = `./images/image${i}.jpg`;
            await fs.writeFile(imagePath, outputImages[i]);
            await sliceImage(imagePath, i);
        }
    } catch (error) {
        console.error("Error: " + error);
    }
}

async function sliceImage(imagePath, pageIndex) {
    try {
        const dimensions = await getImageDimensions(imagePath);
        const sliceWidth = Math.floor(dimensions.width / 3);
        const lineXArray = [sliceWidth, sliceWidth * 2];

        // Slice the image and then change the name of the sections
        await new Promise((resolve, reject) => {
            imageToSlices(imagePath, lineXArray, [], {
                saveToDir: './new',
                clipperOptions: {
                    canvas: Canvas
                }
            }, async (err) => {
                if (err) {
                    reject(err);
                } else {
                    // Wait for the files to be saved before renaming
                    await changeName(pageIndex);
                    resolve();
                }
            });
        });
    } catch (error) {
        console.error("Error slicing image: " + error);
    }
}

async function changeName(pageIndex) {
    try {
        for (let i = 1; i <= 3; i++) {
            const oldFileName = `./new/section-${i}.jpg`;
            const newFileName = `./new/cropped_${pageIndex}_${i}.jpg`;
            await fs.rename(oldFileName, newFileName);
            console.log(`File renamed: ${oldFileName} -> ${newFileName}`);
        }
    } catch (error) {
        console.error('Error renaming file:', error);
    }
}

function getImageDimensions(imagePath) {
    return new Promise((resolve, reject) => {
        sizeOf(imagePath, (err, dimensions) => {
            if (err) {
                reject(err);
            } else {
                resolve(dimensions);
            }
        });
    });
}

// Call the function with the path to your PDF
convertAndSlicePDF('./sop-5.pdf');

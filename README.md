تمام، هاي نسخة جاهزة للـ **README.md** كاملة للمشروع، انسخها كما هي واحفظها في ملف باسم `README.md` في مجلد المشروع:

```markdown
# Image Processing API

A simple Express API for resizing images with caching using TypeScript and Sharp.

---

## Project Structure

```

Image-Processing--API/
├─ src/
│  ├─ index.ts               # Main server
│  ├─ routes/
│  │  └─ images.ts           # Images endpoint
│  └─ utilities/
│     └─ imageProcessor.ts   # Image resizing utility
├─ assets/
│  ├─ full/                  # Original images
│  └─ thumbs/                # Resized images (cached)
├─ src/tests/                # Jasmine unit tests
├─ dist/                     # Compiled JS output
├─ package.json
├─ tsconfig.json
└─ README.md

````

---

## Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/ghaidhamdan/Image-Processing-API.git
cd Image-Processing--API
````


### 2. Install dependencies

```bash
npm install
```

### 3. Add sample images

Place JPEG images in:

```
/assets/full
```

Example: `test.jpg`

### 4. Start the server

```bash
npm run dev
```

Server runs at: `http://localhost:3000/`

Or build and start:

```bash
npm run build
npm start
```

---

## API Endpoint

```
GET /api/images
```

**Query Parameters:**

| Parameter | Type   | Description                        |
| --------- | ------ | ---------------------------------- |
| filename  | string | Name of the image (without `.jpg`) |
| width     | number | Desired width (positive number)    |
| height    | number | Desired height (positive number)   |

**Example:**

```
http://localhost:3000/api/images?filename=encenadaport&width=200&height=200
```

* First access: resizes the image and saves to `/assets/thumbs`.
* Subsequent access: serves cached image.

**Error Handling:**

* 400: Missing filename, width, or height
* 404: Image not found
* Invalid width/height (non-number, zero, negative)

---

## Scripts

| Script           | Description                      |
| ---------------- | -------------------------------- |
| `npm start`      | Start the compiled server        |
| `npm run dev`    | Start the server in dev mode     |
| `npm run build`  | Compile TypeScript to JavaScript |
| `npm run lint`   | Run ESLint for code quality      |
| `npm run format` | Format code with Prettier        |
| `npm test`       | Run Jasmine unit tests           |

---

## Testing

* Unit tests for `resizeImage` utility
* Endpoint tests for `/api/images`
* Run:

```bash
npm test
```

---

## Notes

* Ensure `/assets/full` exists and contains images.
* Resized images are cached in `/assets/thumbs`.
* TypeScript strict mode is enabled for type safety.
* ESLint and Prettier ensure consistent code style.

```


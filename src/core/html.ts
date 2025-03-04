export function template (title: string, content: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <title>${title}</title>
        <style>
            body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 0;
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background-color: #f0f0f0;
                font-size: 16px;
            }
            div {
                padding: 1.5rem;
                border-radius: 1rem;
                background-color: #fff;
                width: 100%;
                max-width: 480px;
            }
            
            h1, h2, h3, h4, h5, h6, p {
                margin: 0 0 1rem;
            }       
            h1:last-child, h2:last-child, h3:last-child, h4:last-child, h5:last-child, h6:last-child, p:last-child {
                margin: 0;     
            }
        </style>
    </head>
    <body>
        <div>${content}</div>
    </body>
    </html>
  `
}

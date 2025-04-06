import * as React from "react";

export default function Loader(
    props: React.PropsWithChildren<{}>,
) {
    const {} = props;

    return (
        <html lang="en" className="dark">
        <body className={`bg-background text-foreground antialiased transition-colors duration-200`}>
        <div className="flex items-center justify-center min-h-screen">
            <div className="loader"></div>
        </div>
        </body>
        </html>
    );

}

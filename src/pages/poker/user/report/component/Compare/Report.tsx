import { playCardArray } from '../../../../../../utils/reference'
import CompareHeatItemReport from "./CompareHeatItemReport"

const CompareHeatReport = ({ finalResult, reportItemActive, bufferSetReportItemActive }: any) => {

    return (
        <div className='flex justify-center items-center flex-wrap'>
            {
                Object.keys(finalResult).length > 0 ?
                    playCardArray.map((item, index) =>
                        <div
                            key={index}
                            className='cursor-pointer'
                            style={{ width: "7.692%", padding: "1px" }}
                        >
                            <CompareHeatItemReport
                                data={item}
                                handResult={finalResult[item]}
                                reportItemActive={reportItemActive}
                                bufferSetReportItemActive={(item: any) => bufferSetReportItemActive(item)}
                            />
                        </div>
                    )
                    :
                    <div className='h-[250px] sm:h-[450px] flex flex-col justify-center items-center w-full'>
                        <svg className='w-32' fill="#00cf55" shapeRendering="geometricPrecision" textRendering="geometricPrecision" imageRendering="optimizeQuality" fillRule="evenodd" clipRule="evenodd" viewBox="0 0 512 377.43"><path fillRule="nonzero" d="M199.52 0h88.83a718.392 718.392 0 0 0-17.47 17.06l-.29.29h-71.07c-5.28 0-10.08 2.17-13.57 5.65-3.48 3.48-5.64 8.29-5.64 13.56v90.05c0 5.27 2.17 10.07 5.65 13.55 2.89 2.9 6.7 4.89 10.91 5.48v-.32c0-17.52 7.83-28.84 17.86-33.94 4.03-2.06 8.45-3.08 12.89-3.08 4.42 0 8.84 1.04 12.88 3.08 4.57 2.31 8.69 5.89 11.83 10.7-15.34-25.82-25.95-42.63-48.47-60.12l27.68-6.25c8.41 4.85 13.89 8.87 20.41 16.06 16.92-27.22 36.01-43.04 59.88-64.45l2.34-.9h26.12c-35.02 38.89-61.05 69.96-87.22 116.85 3.38 5.68 5.45 12.95 5.45 21.78v.77h53.96c5.09 0 9.75-2.02 13.2-5.29l.35-.37c3.49-3.49 5.66-8.29 5.66-13.55v-82.4c5.23-6.17 10.5-12.27 15.76-18.29a36.06 36.06 0 0 1 1.6 10.64v90.05c0 10.05-4.13 19.19-10.75 25.82l-.53.49c-6.59 6.33-15.51 10.25-25.29 10.25h-53.96v3.71c.56-.15 1.14-.23 1.74-.23h9.14c.53 0 1.04.06 1.53.18 10.97 1.76 16.44 9.08 19.03 18.58a6.65 6.65 0 0 1 3.56-1.03h9.14c.53 0 1.04.06 1.53.18 11.68 1.87 17.12 10.04 19.49 20.43.57-.15 1.16-.24 1.77-.24h9.14c.53 0 1.04.07 1.53.18 25.1 4.02 24.73 36.35 24.49 57.44 0 9.76.42 19.46.51 29.21-1.12 22.76-11.43 40.52-22.04 58.83l-.91 1.57c-4.69 8.2-10.12 14.46-16.31 18.74-6.3 4.35-13.27 6.59-20.92 6.67l-.62.03h-78.4c-7.88.14-14.01-3.31-18.52-10.06-3.62-5.43-6.03-13.04-7.33-22.63l-49.7-75.21c-2.93-3.96-6.81-9.95-9.69-16.48-2.23-5.07-3.93-10.58-4.28-15.99-.42-6.4.47-11.55 2.29-15.58 2.26-5 5.86-8.26 10.21-10.03 4.06-1.65 8.66-1.9 13.28-.98 5.54 1.1 11.26 3.91 16.14 7.94l17.14 14.07 5.41 4.44v-73.83c-9-.65-17.14-4.61-23.18-10.65-6.62-6.62-10.74-15.76-10.74-25.82V36.56c0-10.06 4.12-19.21 10.74-25.83C180.31 4.11 189.45 0 199.52 0zm109.83 286.65c0-2.99 2.43-5.42 5.42-5.42 2.99 0 5.41 2.43 5.41 5.42v24.77c0 2.99-2.42 5.41-5.41 5.41s-5.42-2.42-5.42-5.41v-24.77zm-32.02-10.95c0-2.99 2.43-5.42 5.42-5.42 2.99 0 5.42 2.43 5.42 5.42v35.71c0 2.99-2.43 5.42-5.42 5.42-2.99 0-5.42-2.43-5.42-5.42V275.7zm47.92-57.68c.28 7.05-.14 14.34-.51 20.95-.22 3.91-.43 7.53-.43 10.89 0 3.67-2.96 6.64-6.63 6.64-3.66 0-6.63-2.97-6.63-6.64 0-3.12.23-7.21.48-11.62.93-16.44 2.17-38.42-9.31-40.6h-8.7c-.58 0-1.15-.07-1.68-.21.54 7.92.07 16.3-.36 23.81-.22 3.91-.42 7.54-.42 10.9 0 3.66-2.97 6.63-6.64 6.63-3.66 0-6.63-2.97-6.63-6.63 0-3.12.24-7.21.48-11.62.93-16.44 2.17-38.43-9.31-40.6h-8.7c-.6 0-1.18-.08-1.74-.23v34.23c0 3.66-2.97 6.63-6.63 6.63-3.66 0-6.63-2.97-6.63-6.63v-68.87c0-11.54-4.71-18.82-10.72-21.86-2.2-1.11-4.58-1.68-6.92-1.68-2.33 0-4.69.55-6.89 1.67-5.96 3.01-10.59 10.32-10.59 22.14v120.69a6.634 6.634 0 1 1-13.27 0v-12.26a6.39 6.39 0 0 1-1.02-.67c-3.39-2.71-8.1-6.54-12.76-10.35l-17.22-14.12c-3.2-2.65-6.83-4.47-10.23-5.15-2.18-.43-4.19-.38-5.76.25-1.28.52-2.38 1.56-3.12 3.2-.97 2.14-1.42 5.2-1.15 9.31.23 3.64 1.51 7.65 3.2 11.48 2.53 5.73 5.89 10.9 8.36 14.2l50.8 76.83c.59.89.94 1.88 1.05 2.87 1.01 8.3 2.77 14.51 5.37 18.4 1.88 2.82 4.33 4.27 7.38 4.19 25.1-.4 54.27-1.09 79.12 0 4.9-.08 9.39-1.54 13.46-4.35 4.49-3.11 8.6-7.93 12.32-14.44l.95-1.63c9.79-16.87 19.29-33.24 20.29-52.69l-.51-22.53a6.5 6.5 0 0 1-.07-.99l.07-5.32c.19-16.5.47-41.75-13.25-44.22h-8.9zM36.56 0h62.78c10.05 0 19.2 4.12 25.82 10.74l.49.53c6.33 6.58 10.25 15.52 10.25 25.29v90.05c0 10.05-4.12 19.19-10.75 25.82-6.62 6.62-15.77 10.74-25.81 10.74H36.56c-10.02 0-19.16-4.11-25.79-10.74h-.03C4.12 145.81 0 136.67 0 126.61V36.56C0 26.5 4.11 17.35 10.73 10.73l.53-.48C17.84 3.91 26.77 0 36.56 0zm62.78 17.35H36.56c-5.1 0-9.76 2.01-13.21 5.28L23 23c-3.48 3.48-5.65 8.29-5.65 13.56v90.05c0 5.27 2.17 10.07 5.66 13.55 3.47 3.5 8.28 5.66 13.55 5.66h62.78c5.25 0 10.06-2.17 13.54-5.66 3.49-3.49 5.67-8.29 5.67-13.55V36.56c0-5.09-2.02-9.75-5.29-13.21l-.37-.35c-3.48-3.48-8.28-5.65-13.55-5.65zM412.66 0h62.78c10.05 0 19.2 4.12 25.82 10.74l.49.53C508.08 17.85 512 26.79 512 36.56v90.05c0 10.04-4.12 19.19-10.75 25.82-6.62 6.62-15.77 10.74-25.81 10.74h-62.78c-10.02 0-19.16-4.11-25.79-10.74h-.03c-6.62-6.62-10.74-15.76-10.74-25.82V36.56c0-10.06 4.11-19.21 10.73-25.83l.53-.48C393.94 3.91 402.87 0 412.66 0zm62.78 17.35h-62.78c-5.1 0-9.76 2.01-13.21 5.28l-.35.37c-3.48 3.48-5.65 8.29-5.65 13.56v90.05c0 5.27 2.17 10.07 5.66 13.55 3.47 3.5 8.28 5.66 13.55 5.66h62.78c5.25 0 10.06-2.17 13.55-5.66 3.48-3.49 5.66-8.29 5.66-13.55V36.56c0-5.09-2.02-9.75-5.29-13.21l-.37-.35c-3.48-3.48-8.28-5.65-13.55-5.65z"/></svg>
                        <p className='text-[20px] mt-4'>Please select action you are focusing!</p>
                    </div>
            }
        </div >
    );
};

export default CompareHeatReport;

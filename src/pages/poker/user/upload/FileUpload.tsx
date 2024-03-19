
import { useEffect, useState } from 'react';
import { setPageTitle } from '../../../../store/themeConfigSlice';
import { pokerMarkList } from '../../../../utils/reference'
import withReactContent from 'sweetalert2-react-content';
import ActiveUpload from './component/ActiveUpload';
import UploadStatus from './component/UploadStatus';
import UploadProcess from './component/UploadProcess';
import { useNavigate } from 'react-router-dom';
import SupprtSite from './component/SupprtSite';
import UploadUI from './component/UploadUI';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import clsx from 'clsx';
import { uploadingStatus, totalHands, passedTime, fileStatusAccept, completedStatus, rejectedStatus } from "../../../../store/uploadingStatusSlice"

const FileUploadPreview = () => {

    const MySwal = withReactContent(Swal);

    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageTitle('File Upload Preview'));
    });

    const [validationError, setValidationError] = useState<any>([]);
    const [totalCount, setTotalCount] = useState(0)
    const [rejectedCount, setRejectedCount] = useState(0)
    const [completedAmonut, setCompletedAmonut] = useState(0)
    const [availableCount, setAvailableCount] = useState(1000)

    const [fileStatus, setFileStatus] = useState({
        filename: '',
        fileSize: '',
        fileContentAsString: ""
    })

    const navigate = useNavigate();

    useEffect(() => {
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (accessToken === null && refreshToken === null) navigate('/auth/boxed-signin');
    }, [])

    const onchange = async (files: any) => {
        if (files.length > availableCount) {
            MySwal.fire({
                title: `You cannot select more than ${availableCount}`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: 'color-danger'
                },
            });
        } else {

            const intervalId = setInterval(myFunction, 1000);

            function myFunction() {

                dispatch(passedTime())

                if (totalCount === rejectedCount + completedAmonut && totalCount !== 0) {
                    clearInterval(intervalId);
                }
            }

            setTotalCount(files.length);
            dispatch(totalHands(files.length))

            for (let i = 0; i < files.length; i++) {
                const fileItem = files[i];
                setFileStatus({ ...fileStatus, filename: fileItem.name, fileSize: fileItem.size })
                dispatch(fileStatusAccept({
                    filename: fileItem.name,
                    fileSize: fileItem.size,
                }))
                if (fileItem.type.startsWith("text/")) {
                    const readerText = new FileReader();
                    readerText.onload = (event: any) => {
                        const originalCode = readerText.result; // Obtain the original code
                        if (typeof originalCode === 'string') {
                            setFileStatus(prevFileStatus => ({
                                ...prevFileStatus,
                                fileContentAsString: originalCode
                            }));
                        }
                    };
                    readerText.readAsText(fileItem);
                }

                let result;
                result = await handleStreamFile(fileItem);

                dispatch(uploadingStatus(i))

                if (result !== 200) {
                    let currentValidationError = validationError;
                    currentValidationError.push({
                        name: fileItem.name,
                        cause: "Validation Error"
                    });

                    noActionNodification(fileItem.name, "typeError", 'danger')

                    setValidationError(currentValidationError);
                    setRejectedCount(prerejectedCount => prerejectedCount + 1);
                    dispatch(rejectedStatus(files.length - i))

                } else {
                    setCompletedAmonut(prevCompletedAmount => prevCompletedAmount + 1); // Update using the previous state
                    dispatch(completedStatus(files.length - i))
                }
            }
        }
    };

    const handleStreamFile = async (fileItem: any) => {

        return new Promise((resolve, reject) => {
            if (fileItem.type.startsWith("text/")) {
                const reader = new FileReader();
                reader.readAsArrayBuffer(fileItem);
                reader.onloadend = async (event: any) => {
                    const file = event.target.result;
                    const result = await handleFileUpload(file);

                    resolve(result);
                };
            } else {
                resolve(400);
            }
        });
    }

    const handleFileUpload = async (file: any) => {
        const url = 'http://localhost:8000/api/v1/data-stream/data';
        const options = {
            method: 'post',
            body: file,
            headers: {
                'Content-Type': 'application/octet-stream',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`  // Include the JWT token in the Authorization header
            },
            responseType: 'json',
        };

        const response = await fetch(url, options);

        return response.status;
    }

    const noActionNodification = (name: any, type: any, color: any) => {

        if (type === 'typeError') {
            MySwal.fire({
                title: `The type of the ${name} file is not correct.`,
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 3000,
                showCloseButton: true,
                customClass: {
                    popup: `color-${color}`
                },
            });
        }
    };

    return (
        <div>
            <div className='flex justify-center mt-[10px] transition-all'>
                <div className={clsx("pt-2", totalCount > 0 ? "w-full" : "space-y-8 w-full xl:w-1/2 transition-all")}>
                    <div className="multiple-file-upload panel">

                        <div className={clsx("transition-all", totalCount > 0 ? "hidden" : "")}>
                            <UploadUI
                                availableCount={availableCount}
                                onFiles={(files: any) => onchange(files)}
                                onslider={(e: any) => setAvailableCount(e)}
                            />
                        </div>
                        <div className=''>
                            <div className={clsx(totalCount > 0 ? "space-y-2 mb-8" : "hidden")}>
                                <div className="w-full h-2.5 bg-[#ebedf2] dark:bg-dark/40 rounded-full flex">
                                    <div
                                        className="bg-warning h-2.5 rounded-full rounded-bl-full text-center text-white text-xs transition-all"
                                        style={{ width: `calc(${(completedAmonut) * (100 / (totalCount - rejectedCount))}%)` }}
                                    ></div>
                                </div>
                            </div>
                            <div className='flex justify-center flex-wrap pt-2'>
                                <div className={clsx('w-full xl:w-2/5', totalCount > 0 ? 'xl:border-r border-primary border-dashed xl:pr-8 border-b-[1px] xl:border-r-[1px] xl:border-b-[0px]' : '')}>
                                    <div className={clsx(totalCount > 0 ? "" : "hidden")}>
                                        <ActiveUpload
                                            totalCount={totalCount}
                                            rejectedCount={rejectedCount}
                                            completedAmonut={completedAmonut}
                                            validationError={validationError}
                                        />
                                        <UploadStatus
                                            fileStatus={fileStatus}
                                        />
                                    </div>
                                    <SupprtSite pokerMarkList={pokerMarkList} />
                                </div>
                                <div className={clsx(totalCount > 0 ? "w-full flex justify-center items-center xl:w-3/5 px-4 sm:px-6 md:px-8 lg:px-12" : "hidden")}>
                                    <UploadProcess
                                        staticData={{
                                            totalCount: totalCount,
                                            rejectedCount: rejectedCount,
                                            completedAmonut: completedAmonut
                                        }}
                                        validationError={validationError}
                                        setTotalCount={(total: number) => setTotalCount(total)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default FileUploadPreview;
import { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { blogRead } from '../../../../utils/functions/admin/blogManaging/BlogManaging'
import News from './News'
import ArticleItem from './ArticleItem'
import { setPageTitle } from '../../../../store/themeConfigSlice';
import RankingContributors from './RankingContributors'


export default function Article() {

    const dispatch = useDispatch();
    const [blogList, setBlogList] = useState([])
    const [blogListInfo, setBlogListInfo] = useState({
        type: -1,
        title: "",
        content: "",
        image: [],
    })

    useEffect(() => {

        dispatch(setPageTitle('Article'));

        async function fetchData() {
            let result = await blogRead(blogListInfo).then()
            setBlogList(result)
        }
        fetchData()
    }, [])

    return (
        <div className='flex justify-center'>
            <div className='max-w-[1000px]'>
                <News data={blogList} />
                {/* <RankingContributors data={blogList} /> */}
                {blogList.map((item: any, index: any) =>
                    <ArticleItem
                        key={index}
                        item={item}
                    />
                )}
            </div>
        </div>
    )
}
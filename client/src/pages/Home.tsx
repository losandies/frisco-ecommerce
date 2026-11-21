import HomepageContent from '../components/content/HomepageContent';
import PageContainer from '../components/misc/PageContainer';
import NavBar from '../components/navbar/NavBar';
import SideBar from '../components/sidebar/SideBar';

const Home = () => {
    return (
        <PageContainer>
            <NavBar />
            <div className='h-full w-full flex flex-row md:mb-[150px] justify-between'>
                <div className='lg:mr-5'>
                    <SideBar />
                </div>

                <div>
                    <HomepageContent />
                </div>
                <div></div>
            </div>
        </PageContainer>
    );
};

export default Home;

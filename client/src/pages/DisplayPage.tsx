import ItemList from '../components/content/ItemList';
import PageContainer from '../components/misc/PageContainer';
import NavBar from '../components/navbar/NavBar';
import SideBar from '../components/sidebar/SideBar';

const DisplayPage = () => {
    return (
        <PageContainer>
            <NavBar />
            <div className='h-full w-full flex flex-row md:mb-[50px] justify-between'>
                <div className='lg:mr-5'>
                    <SideBar />
                </div>
                <ItemList />
            </div>
        </PageContainer>
    );
};

export default DisplayPage;

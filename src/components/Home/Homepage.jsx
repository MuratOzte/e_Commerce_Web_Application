import HomepageCards from './HomepageCards';

const categories = [
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRLrx3Ue_THqzqhCmXJ6rJtv0UGgt1RZRFA2Q&usqp=CAU',
        title: 'Kiyafetler',
        to: '/products/1',
    },
    {
        src: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c2hvZXN8ZW58MHx8MHx8fDA%3D',
        title: 'Ayakkabilar',
        to: '/products/2',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSmidBRRnkPFw4iWkpdTocBNlgcBSU11GLrIg&usqp=CAU',
        title: 'Aksesuarlar',
        to: '/products/3',
    },
    {
        src: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStONG7zUYkoVwnxCTHnQUNyx1WnEB7k9LApA&usqp=CAU',
        title: 'Spor Giyim',
        to: '/products/4',
    },
    {
        src: 'https://img2-hotic.mncdn.com/Content/Images/Thumbs/3483917_acik-mavi-kadin-canta-176886.jpeg',
        title: 'Çanta',
        to: '/products/5',
    },
];

const Home = () => {
    const rows = [];
    for (let i = 0; i < categories.length; i += 3) {
        const rowItems = categories
            .slice(i, i + 3)
            .map((e) => (
                <HomepageCards
                    key={e.title}
                    src={e.src}
                    title={e.title}
                    to={e.to}
                />
            ));
        rows.push(
            <div
                key={i}
                style={{
                    display: 'flex',
                    justifyContent: 'space-around',
                }}
            >
                {rowItems}
            </div>
        );
    }

    return <>{rows}</>;
};

const paperSx = {};

export default Home;

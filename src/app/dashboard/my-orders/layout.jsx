
export default function MyOrdersPageLayout({ children }) {
    return (

        <div className="sm:px-6">
            <h1 className="text-lg font-medium font-sans  my-8 text-black">My Orders</h1>
            {children}
        </div>

    );
}

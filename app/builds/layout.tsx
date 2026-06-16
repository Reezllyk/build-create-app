export default function BuildsLayout({
    children
} : { children: React.ReactNode }) {
    return (
        <div className="container mx-auto max-w-5xl">
            <div className="fixed inset-0 -z-20">
                <div className="absolute left-0 top-0 h-[300px] w-[300px] rounded-full bg-cyan-500/10 blur-3xl" />
                <div className="absolute right-0 bottom-0 h-[500px] w-[500px] rounded-full bg-cyan-500/10 blur-3xl" />
            </div>


            {children}
        </div>
        )
}
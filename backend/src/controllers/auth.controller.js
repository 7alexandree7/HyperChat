
export const checkAuth = async () => {
    if (!req.user) return res.status(401).json({ message: "Unauthorized" });

    return res.status(200).json(req.user);
}
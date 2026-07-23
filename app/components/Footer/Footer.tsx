import Link from "next/link";
import {
    Mail,
    Phone,
    MapPin,
} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-slate-900 dark:bg-gray-950 text-gray-300 border-t border-gray-800 transition-colors">
            <div className="max-w-7xl mx-auto px-6 py-16 grid lg:grid-cols-4 md:grid-cols-2 gap-10">

                {/* Company */}
                <div>
                    <h2 className="text-2xl font-bold text-white mb-5">
                        Trend<span className="text-blue-500">Shop</span>
                    </h2>
                    <p className="text-sm leading-7 text-gray-400">
                        TrendShop is your trusted online shopping destination for
                        fashion, electronics, accessories, beauty products, and much
                        more.
                    </p>
                </div>

                {/* Quick Links */}
                <div>
                    <h3 className="text-white font-semibold mb-5">
                        Quick Links
                    </h3>

                    <ul className="space-y-3 text-sm">
                        <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
                        <li><Link href="/products" className="hover:text-blue-400 transition">Products</Link></li>
                        <li><Link href="/About" className="hover:text-blue-400 transition">About Us</Link></li>
                        <li><Link href="/contact" className="hover:text-blue-400 transition">Contact</Link></li>
                        <li><Link href="/login" className="hover:text-blue-400 transition">Login</Link></li>
                    </ul>
                </div>

                {/* Customer Support */}
                <div>
                    <h3 className="text-white font-semibold mb-5">
                        Customer Support
                    </h3>

                    <ul className="space-y-3 text-sm text-gray-400">
                        <li className="hover:text-white cursor-pointer transition">FAQs</li>
                        <li className="hover:text-white cursor-pointer transition">Shipping Policy</li>
                        <li className="hover:text-white cursor-pointer transition">Return Policy</li>
                        <li className="hover:text-white cursor-pointer transition">Privacy Policy</li>
                        <li className="hover:text-white cursor-pointer transition">Terms & Conditions</li>
                    </ul>
                </div>

                {/* Contact */}
                <div>
                    <h3 className="text-white font-semibold mb-5">
                        Contact Us
                    </h3>

                    <div className="space-y-4 text-sm text-gray-400">
                        <div className="flex gap-3 items-center">
                            <MapPin size={18} className="text-blue-500" />
                            Kerala, India
                        </div>

                        <div className="flex gap-3 items-center">
                            <Phone size={18} className="text-blue-500" />
                            +91 9876543210
                        </div>

                        <div className="flex gap-3 items-center">
                            <Mail size={18} className="text-blue-500" />
                            support@trendshop.com
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-gray-800 py-6 text-center text-sm text-gray-500">
                © 2026 TrendShop. All Rights Reserved.
            </div>
        </footer>
    );
}
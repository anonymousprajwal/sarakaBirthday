import { useState, useEffect } from 'react';
import { Heart, Sparkles, ChevronLeft, ChevronRight, X, Star, Gift, Cake, Camera, Play } from 'lucide-react';

const images = [
  '/assets/images/photo1.jpg',
  '/assets/images/photo2.jpg',
  '/assets/images/photo3.jpg',
  '/assets/images/photo4.jpg',
];

const videos = ['/assets/videos/video1.mp4', '/assets/videos/video2.mp4'];

export default function Birthday() {
  const [loaded, setLoaded] = useState(false);
  const [showTitle, setShowTitle] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [modal, setModal] = useState({ open: false, type: 'image', index: 0 });
  const [activeSection, setActiveSection] = useState('hero');
  const [hoveredImage, setHoveredImage] = useState(null);
  const [hoveredVideo, setHoveredVideo] = useState(null);

  useEffect(() => {
    setTimeout(() => setLoaded(true), 100);
    setTimeout(() => setShowTitle(true), 600);
    
    const newConfetti = [...Array(60)].map((_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 3 + Math.random() * 4,
      rotation: Math.random() * 360,
      color: ['#ff6b9d', '#ffc371', '#a8edea', '#fed6e3', '#c3cfe2', '#f093fb', '#4facfe'][Math.floor(Math.random() * 7)]
    }));
    setConfetti(newConfetti);
  }, []);

  const openImage = (i) => setModal({ open: true, type: 'image', index: i });
  const openVideo = (i) => setModal({ open: true, type: 'video', index: i });
  const close = () => setModal({ open: false, type: modal.type, index: modal.index });

  const next = () => {
    const list = modal.type === 'image' ? images : videos;
    setModal((m) => ({ ...m, index: (m.index + 1) % list.length }));
  };

  const prev = () => {
    const list = modal.type === 'image' ? images : videos;
    setModal((m) => ({ ...m, index: (m.index - 1 + list.length) % list.length }));
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Multi-layer animated background */}
      <div className="absolute inset-0 bg-gradient-to-br from-pink-600 via-purple-700 to-indigo-900" />
      <div className="absolute inset-0 bg-gradient-to-tl from-rose-500/30 via-fuchsia-500/30 to-violet-600/30 animate-gradient-rotate" />
      
      {/* Animated mesh gradients */}
      <div className="absolute inset-0 opacity-40">
        <div className="absolute top-0 -left-20 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob" />
        <div className="absolute top-0 -right-20 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-2000" />
        <div className="absolute -bottom-20 left-20 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-4000" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-indigo-400 rounded-full mix-blend-multiply filter blur-3xl animate-blob animation-delay-3000" />
      </div>

      {/* Enhanced confetti */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {confetti.map((c) => (
          <div
            key={c.id}
            className="absolute animate-confetti-fall"
            style={{
              left: `${c.left}%`,
              top: '-20px',
              animationDelay: `${c.delay}s`,
              animationDuration: `${c.duration}s`,
            }}
          >
            <div 
              className="w-3 h-3 rounded-sm shadow-glow"
              style={{ 
                backgroundColor: c.color,
                transform: `rotate(${c.rotation}deg)`,
              }}
            />
          </div>
        ))}
      </div>

      {/* Floating elements with variety */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(35)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-smooth"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${6 + Math.random() * 8}s`,
            }}
          >
            {i % 5 === 0 ? (
              <Sparkles className="text-yellow-200 opacity-70 drop-shadow-glow" size={20 + Math.random() * 28} />
            ) : i % 5 === 1 ? (
              <Heart className="text-pink-300 opacity-60 drop-shadow-glow" size={16 + Math.random() * 22} fill="currentColor" />
            ) : i % 5 === 2 ? (
              <Star className="text-yellow-300 opacity-70 drop-shadow-glow" size={14 + Math.random() * 20} fill="currentColor" />
            ) : i % 5 === 3 ? (
              <Gift className="text-purple-300 opacity-60 drop-shadow-glow" size={16 + Math.random() * 20} />
            ) : (
              <div className="w-2 h-2 bg-white rounded-full opacity-80 shadow-glow" />
            )}
          </div>
        ))}
      </div>

      {/* Enhanced navigation */}
      <nav className="relative z-10 p-6 flex justify-center gap-4 animate-slide-down">
        {[
          { id: 'hero', icon: '🎉', label: 'Home' },
          { id: 'gallery', icon: '✨', label: 'Gallery' },
          { id: 'message', icon: '💝', label: 'Message' }
        ].map((section) => (
          <button
            key={section.id}
            onClick={() => setActiveSection(section.id)}
            className={`px-8 py-3.5 rounded-full font-bold transition-all duration-500 transform flex items-center gap-2 ${
              activeSection === section.id
                ? 'bg-white text-purple-700 shadow-2xl scale-110 -translate-y-2'
                : 'bg-white/15 text-white hover:bg-white/25 backdrop-blur-md hover:scale-105 border border-white/20'
            }`}
          >
            <span className="text-xl">{section.icon}</span>
            <span className="hidden sm:inline">{section.label}</span>
          </button>
        ))}
      </nav>

      {/* Hero Section */}
      {activeSection === 'hero' && (
        <div className={`relative z-10 flex flex-col items-center justify-center min-h-[85vh] px-4 transition-all duration-1000 ${loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <div className="text-center space-y-10 max-w-5xl">
            {/* Animated cake with candles */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-yellow-400/40 rounded-full blur-3xl animate-pulse-glow" />
              <div className="relative">
                <Cake className="w-40 h-40 text-white drop-shadow-2xl animate-bounce-gentle mx-auto" strokeWidth={1.5} />
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="text-4xl animate-flicker" style={{ animationDelay: `${i * 0.2}s` }}>🕯️</div>
                  ))}
                </div>
              </div>
            </div>

            <div className="space-y-5">
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black text-white drop-shadow-2xl animate-title-bounce tracking-tight leading-none">
                Happy
              </h1>
              <h1 className="text-8xl md:text-9xl lg:text-[12rem] font-black bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-2xl animate-title-bounce-delay tracking-tight leading-none">
                Birthday!
              </h1>
            </div>

            {showTitle && (
              <div className="space-y-10 animate-fade-scale-in">
                <p className="text-3xl md:text-5xl lg:text-6xl text-white font-light drop-shadow-xl tracking-wide">
                  Celebrating the most <span className="font-bold text-yellow-200 animate-pulse">amazing</span> person! ✨
                </p>
                
                <div className="flex justify-center gap-3 flex-wrap">
                  {[...Array(9)].map((_, i) => (
                    <Heart
                      key={i}
                      className="text-pink-300 animate-pulse-heart drop-shadow-glow"
                      size={40}
                      style={{ animationDelay: `${i * 0.1}s` }}
                      fill="currentColor"
                    />
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-5 justify-center items-center mt-14">
                  <button
                    onClick={() => setActiveSection('gallery')}
                    className="group relative bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-600 text-white px-12 py-6 rounded-full font-bold text-2xl shadow-2xl hover:shadow-pink-500/50 transform hover:scale-110 hover:-rotate-2 transition-all duration-500 animate-bounce-slow overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/30 to-white/0 animate-shimmer" />
                    <div className="relative flex items-center gap-3">
                      <Gift className="group-hover:rotate-12 transition-transform duration-300" size={28} />
                      <span>View Memories</span>
                      <Sparkles className="group-hover:scale-125 transition-transform duration-300" size={28} />
                    </div>
                  </button>
                </div>

                <div className="mt-12 bg-white/10 backdrop-blur-lg rounded-3xl px-8 py-6 inline-block border border-white/20 animate-fade-in-delay shadow-xl">
                  <p className="text-white/90 text-xl font-light flex items-center gap-3">
                    <Star className="text-yellow-300 animate-spin-slow" fill="currentColor" />
                    Scroll down to explore your special moments
                    <Star className="text-yellow-300 animate-spin-slow" fill="currentColor" />
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Gallery Section */}
      {activeSection === 'gallery' && (
        <div className="relative z-10 px-4 py-12 pb-20">
          <div className="max-w-7xl mx-auto">
            {/* Main title */}
            <div className="text-center mb-16 animate-slide-up">
              <h2 className="text-6xl md:text-8xl font-black text-white drop-shadow-2xl mb-6 tracking-tight">
                Your Journey
              </h2>
              <p className="text-2xl md:text-3xl text-yellow-200 font-light drop-shadow-lg">
                Every moment tells a story ✨
              </p>
            </div>

            {/* Photos Section */}
            <div className="mb-24">
              <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/30 shadow-2xl animate-pop-in">
                <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                  <div className="flex items-center gap-5">
                    <div className="relative">
                      <div className="absolute inset-0 bg-pink-400 rounded-2xl blur-xl opacity-50 animate-pulse" />
                      <div className="relative bg-gradient-to-br from-pink-400 via-pink-500 to-purple-500 p-5 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                        <Camera className="w-10 h-10 text-white" strokeWidth={2.5} />
                      </div>
                    </div>
                    <div>
                      <h3 className="text-4xl font-black text-white drop-shadow-lg">Photo Gallery</h3>
                      <p className="text-white/80 text-lg mt-1">Captured memories forever</p>
                    </div>
                  </div>
                  <div className="bg-gradient-to-r from-pink-500/30 to-purple-500/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg">
                    <span className="text-white font-bold text-lg flex items-center gap-2">
                      <Camera size={20} />
                      {images.length} Photos
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                  {images.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => openImage(i)}
                      onMouseEnter={() => setHoveredImage(i)}
                      onMouseLeave={() => setHoveredImage(null)}
                      className="group relative aspect-square rounded-2xl overflow-hidden transform transition-all duration-500 hover:scale-105 hover:-rotate-2 hover:z-10 shadow-2xl animate-pop-in cursor-pointer bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20"
                      style={{ animationDelay: `${i * 0.1}s` }}
                    >
                      <img
                        src={src}
                        alt={`Memory ${i + 1}`}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      />
                      
                      <div className={`absolute inset-0 bg-gradient-to-t from-black/80 via-purple-900/40 to-transparent transition-opacity duration-500 ${hoveredImage === i ? 'opacity-100' : 'opacity-0'}`} />
                      
                      <div className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 ${hoveredImage === i ? 'opacity-100 scale-100' : 'opacity-0 scale-75'}`}>
                        <div className="relative mb-4">
                          <div className="absolute inset-0 bg-white rounded-full blur-lg opacity-50" />
                          <div className="relative bg-white/95 backdrop-blur-sm rounded-full p-4 shadow-2xl">
                            <Sparkles className="text-purple-600 w-8 h-8" strokeWidth={3} />
                          </div>
                        </div>
                        <span className="text-white font-bold text-base bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
                          Click to view
                        </span>
                      </div>
                      
                      <div className="absolute top-3 right-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white px-4 py-1.5 rounded-full text-sm font-bold shadow-xl border border-white/30">
                        #{i + 1}
                      </div>

                      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Videos Section */}
            <div className="bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-xl rounded-3xl p-8 md:p-10 border-2 border-white/30 shadow-2xl animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="flex flex-col md:flex-row items-center justify-between mb-10 gap-4">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="absolute inset-0 bg-purple-400 rounded-2xl blur-xl opacity-50 animate-pulse" />
                    <div className="relative bg-gradient-to-br from-purple-400 via-purple-500 to-indigo-500 p-5 rounded-2xl shadow-2xl transform hover:scale-110 transition-transform duration-300">
                      <Play className="w-10 h-10 text-white" strokeWidth={2.5} fill="white" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-4xl font-black text-white drop-shadow-lg">Video Memories</h3>
                    <p className="text-white/80 text-lg mt-1">Moments that move us</p>
                  </div>
                </div>
                <div className="bg-gradient-to-r from-purple-500/30 to-indigo-500/30 backdrop-blur-sm px-6 py-3 rounded-full border border-white/30 shadow-lg">
                  <span className="text-white font-bold text-lg flex items-center gap-2">
                    <Play size={20} />
                    {videos.length} Videos
                  </span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {videos.map((src, i) => (
                  <div
                    key={src}
                    onMouseEnter={() => setHoveredVideo(i)}
                    onMouseLeave={() => setHoveredVideo(null)}
                    className="group relative rounded-2xl overflow-hidden shadow-2xl animate-pop-in transform hover:scale-105 transition-all duration-500 bg-gradient-to-br from-white/10 to-white/5 border-2 border-white/20"
                    style={{ animationDelay: `${i * 0.15}s` }}
                  >
                    <div className="relative aspect-video">
                      <video
                        src={src}
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        className="w-full h-full object-cover"
                      />
                      
                      <button
                        onClick={() => openVideo(i)}
                        className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-black/80 via-black/50 to-black/30 group-hover:from-black/60 group-hover:via-black/40 group-hover:to-black/20 transition-all duration-500"
                      >
                        <div className="relative">
                          <div className="absolute inset-0 bg-purple-500/60 rounded-full blur-2xl animate-pulse" />
                          <div className={`relative bg-white/95 backdrop-blur-sm rounded-full p-8 transform transition-all duration-500 shadow-2xl ${hoveredVideo === i ? 'scale-125 rotate-12' : 'scale-100'}`}>
                            <div className="w-0 h-0 border-l-[24px] border-l-purple-600 border-t-[15px] border-t-transparent border-b-[15px] border-b-transparent ml-2" />
                          </div>
                        </div>
                      </button>
                      
                      <div className="absolute bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-black/90 via-black/70 to-transparent">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-xl border border-white/30 flex items-center gap-2">
                              <Play size={14} fill="white" />
                              Video #{i + 1}
                            </div>
                          </div>
                          <div className="text-white font-bold text-sm bg-black/60 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
                            Click to play
                          </div>
                        </div>
                      </div>

                      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Message Section */}
      {activeSection === 'message' && (
        <div className="relative z-10 flex items-center justify-center min-h-[85vh] px-4 py-12">
          <div className="relative max-w-4xl w-full">
            <div className="absolute inset-0 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-3xl blur-3xl animate-pulse-glow" />
            <div className="relative bg-gradient-to-br from-white/15 to-white/5 backdrop-blur-2xl rounded-3xl p-10 md:p-16 shadow-2xl animate-scale-in border-2 border-white/30">
              <div className="text-center mb-12">
                <div className="inline-block relative mb-8">
                  <div className="absolute inset-0 bg-pink-400/40 rounded-full blur-3xl animate-pulse" />
                  <div className="relative text-8xl animate-bounce-gentle">💝</div>
                </div>
                <h2 className="text-5xl md:text-7xl font-black text-white mb-6 drop-shadow-2xl tracking-tight">
                  A Special Message
                </h2>
                <div className="w-32 h-1.5 bg-gradient-to-r from-pink-400 via-purple-400 to-indigo-400 mx-auto rounded-full shadow-lg" />
              </div>
              
              <div className="space-y-8 text-white text-xl md:text-2xl leading-relaxed">
                <p className="animate-fade-in-stagger backdrop-blur-sm bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-2xl border border-white/20 shadow-lg" style={{ animationDelay: '0.2s' }}>
                  <span className="text-3xl mr-3">🌟</span>
                  On this incredible day, I want you to know how truly <span className="font-bold text-yellow-200 text-2xl">amazing</span> you are. 
                  Your smile lights up every room, and your presence makes the world infinitely better.
                </p>
                <p className="animate-fade-in-stagger backdrop-blur-sm bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-2xl border border-white/20 shadow-lg" style={{ animationDelay: '0.4s' }}>
                  <span className="text-3xl mr-3">🎈</span>
                  May this year overflow with <span className="font-bold text-pink-200 text-2xl">joy</span>, <span className="font-bold text-purple-200 text-2xl">adventure</span>, 
                  and countless moments that take your breath away. Chase every dream fearlessly!
                </p>
                <p className="animate-fade-in-stagger backdrop-blur-sm bg-gradient-to-r from-white/10 to-white/5 p-8 rounded-2xl border border-white/20 shadow-lg" style={{ animationDelay: '0.6s' }}>
                  <span className="text-3xl mr-3">💫</span>
                  Thank you for being such a <span className="font-bold text-yellow-200 text-2xl">beautiful soul</span>. 
                  The world is infinitely brighter because you exist. Here's to celebrating the wonder that is YOU!
                </p>
                <div className="text-center mt-14 pt-10 border-t-2 border-white/40 animate-fade-in-stagger" style={{ animationDelay: '0.8s' }}>
                  <p className="text-4xl md:text-6xl font-black mb-8 bg-gradient-to-r from-yellow-200 via-pink-200 to-purple-200 bg-clip-text text-transparent drop-shadow-lg">
                    🎉 Cheers to You! 🎉
                  </p>
                  <p className="text-2xl md:text-3xl text-white/95 italic font-light">
                    May all your wishes come true today and always! 🎂✨
                  </p>
                  <div className="flex justify-center gap-3 mt-8 flex-wrap">
                    {[...Array(5)].map((_, i) => (
                      <Heart
                        key={i}
                        className="text-pink-300 animate-pulse-heart"
                        size={36}
                        style={{ animationDelay: `${i * 0.15}s` }}
                        fill="currentColor"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Enhanced Modal */}
      {modal.open && (
        <div
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 animate-fade-in backdrop-blur-xl"
          onClick={close}
        >
          <button
            onClick={close}
            className="absolute top-6 right-6 bg-white hover:bg-red-500 text-gray-800 hover:text-white rounded-full p-4 transition-all duration-300 hover:scale-125 hover:rotate-180 shadow-2xl z-10 group"
            aria-label="Close"
          >
            <X className="group-hover:scale-110 transition-transform" size={32} strokeWidth={3} />
          </button>

          <button
            onClick={prev}
            className="absolute left-6 top-1/2 -translate-y-1/2 bg-white hover:bg-purple-500 text-gray-800 hover:text-white rounded-full p-5 transition-all duration-300 hover:scale-125 hover:-translate-x-3 shadow-2xl group"
            aria-label="Previous"
          >
            <ChevronLeft className="group-hover:scale-110 transition-transform" size={36} strokeWidth={3} />
          </button>

          <button
            onClick={next}
            className="absolute right-6 top-1/2 -translate-y-1/2 bg-white hover:bg-purple-500 text-gray-800 hover:text-white rounded-full p-5 transition-all duration-300 hover:scale-125 hover:translate-x-3 shadow-2xl group"
            aria-label="Next"
          >
            <ChevronRight className="group-hover:scale-110 transition-transform" size={36} strokeWidth={3} />
          </button>

          <div className="max-w-7xl max-h-[90vh] relative" onClick={(e) => e.stopPropagation()}>
            {modal.type === 'image' ? (
              <img
                src={images[modal.index]}
                alt={`Photo ${modal.index + 1}`}
                className="max-w-full max-h-[90vh] object-contain rounded-3xl shadow-2xl animate-modal-zoom border-4 border-white/20"
              />
            ) : (
              <video
                src={videos[modal.index]}
                controls
                autoPlay
                className="max-w-full max-h-[90vh] rounded-3xl shadow-2xl animate-modal-zoom border-4 border-white/20"
              />
            )}
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes gradient-rotate {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.2); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }
        @keyframes confetti-fall {
          0% { transform: translateY(0) rotate(0deg); opacity: 1; }
          100% { transform: translateY(100vh) rotate(1080deg); opacity: 0; }
        }
        @keyframes float-smooth {
          0%, 100% { transform: translate(0, 0) rotate(0deg); opacity: 0.5; }
          25% { transform: translate(20px, -20px) rotate(90deg); opacity: 0.8; }
          50% { transform: translate(40px, 10px) rotate(180deg); opacity: 0.6; }
          75% { transform: translate(10px, 30px) rotate(270deg); opacity: 0.7; }
        }
        @keyframes pulse-glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
        @keyframes bounce-gentle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        @keyframes title-bounce {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes title-bounce-delay {
          0%, 100% { transform: translateY(0) scale(1); }
          50% { transform: translateY(-15px) scale(1.05); }
        }
        @keyframes fade-scale-in {
          from { opacity: 0; transform: scale(0.9); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes pulse-heart {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.2); }
        }
        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes slide-down {
          from { transform: translateY(-100px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes slide-up {
          from { transform: translateY(50px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        @keyframes pop-in {
          0% { opacity: 0; transform: scale(0.5) rotate(-10deg); }
          80% { transform: scale(1.1) rotate(5deg); }
          100% { opacity: 1; transform: scale(1) rotate(0deg); }
        }
        @keyframes fade-in-stagger {
          from { opacity: 0; transform: translateX(-30px); }
          to { opacity: 1; transform: translateX(0); }
        }
        @keyframes scale-in {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes modal-zoom {
          from { transform: scale(0.85); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes fade-in-delay {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes flicker {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .animate-gradient-rotate { 
          background-size: 200% 200%;
          animation: gradient-rotate 8s ease infinite; 
        }
        .animate-blob { animation: blob 7s infinite; }
        .animation-delay-2000 { animation-delay: 2s; }
        .animation-delay-3000 { animation-delay: 3s; }
        .animation-delay-4000 { animation-delay: 4s; }
        .animate-confetti-fall { animation: confetti-fall linear forwards; }
        .animate-float-smooth { animation: float-smooth ease-in-out infinite; }
        .animate-pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
        .animate-bounce-gentle { animation: bounce-gentle 3s ease-in-out infinite; }
        .animate-title-bounce { animation: title-bounce 2s ease-in-out infinite; }
        .animate-title-bounce-delay { animation: title-bounce-delay 2s ease-in-out 0.2s infinite; }
        .animate-fade-scale-in { animation: fade-scale-in 1.2s ease-out; }
        .animate-pulse-heart { animation: pulse-heart 1.5s ease-in-out infinite; }
        .animate-bounce-slow { animation: bounce-slow 3s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s infinite; }
        .animate-spin-slow { animation: spin-slow 3s linear infinite; }
        .animate-slide-down { animation: slide-down 0.8s ease-out; }
        .animate-slide-up { animation: slide-up 0.8s ease-out; }
        .animate-pop-in { animation: pop-in 0.6s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards; }
        .animate-fade-in-stagger { animation: fade-in-stagger 0.8s ease-out forwards; }
        .animate-scale-in { animation: scale-in 0.8s ease-out; }
        .animate-modal-zoom { animation: modal-zoom 0.3s ease-out; }
        .animate-fade-in { animation: fade-in 1s ease-out; }
        .animate-fade-in-delay { animation: fade-in-delay 1s ease-out 1s forwards; opacity: 0; }
        .animate-flicker { animation: flicker 1.5s ease-in-out infinite; }
        
        .drop-shadow-glow { filter: drop-shadow(0 0 8px currentColor); }
        .shadow-glow { box-shadow: 0 0 15px currentColor; }
      `}</style>
    </div>
  );
}
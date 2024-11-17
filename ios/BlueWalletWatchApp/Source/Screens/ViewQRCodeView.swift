import SwiftUI

struct ViewQRCodeView: View {
    var content: String
    private let qrCodeGenerator = QRCodeGenerator() // QR Code generator
    @State private var isFullscreen: Bool = false // State to manage fullscreen mode

    var body: some View {
        GeometryReader { geometry in
            ZStack {
                TabView {
                    // QR Code Page
                    qrCodeGenerator.generateQRCode(from: content)
                        .interpolation(.none) // Ensure crisp QR code
                        .resizable()
                        .scaledToFit()
                        .frame(
                          width: isFullscreen ? geometry.size.width * 1.0 : geometry.size.width * 0.8,
                          height: isFullscreen ? geometry.size.height * 1.1 : geometry.size.width * 0.8
                        )
                        .onTapGesture {
                            withAnimation {
                                isFullscreen.toggle() // Toggle fullscreen mode on tap
                            }
                        }

                    // Text Page
                    ScrollView {
                        Text(content)
                            .font(.headline)
                            .multilineTextAlignment(.center)
                            .padding()
                            .frame(maxWidth: .infinity, maxHeight: .infinity)
                    }
                }
                .tabViewStyle(PageTabViewStyle(indexDisplayMode: .automatic)) // Side-to-side gesture
             

                // Fullscreen Overlay
                if isFullscreen {
                    Color.black.opacity(0.8) // Dark background for focus
                        .edgesIgnoringSafeArea(.all)
                        .onTapGesture {
                            withAnimation {
                                isFullscreen.toggle() // Exit fullscreen on tap
                            }
                        }

                    qrCodeGenerator.generateQRCode(from: content)
                        .interpolation(.none)
                        .resizable()
                        .scaledToFill()
                        
                        .frame(
                          width: geometry.size.width * 1.0,
                          height: geometry.size.height * 1.0,
                          alignment: .center)
                          
                        
                        .onTapGesture {
                            withAnimation {
                                isFullscreen.toggle() // Exit fullscreen on tap
                            }
                        }
                  
                    
                }
              
            }   .edgesIgnoringSafeArea(.all)
            .navigationBarBackButtonHidden(isFullscreen) // Hide back button in fullscreen
            .navigationBarHidden(isFullscreen) // Hide navigation bar in fullscreen mode
            
        }
    }
}

// MARK: - QR Code Generator Helper

// MARK: - Preview

struct ViewQRCodeView_Previews: PreviewProvider {
    static var previews: some View {
        ViewQRCodeView(content: "1BoatSLRHtKNngkdXEeobR76b53LETtpyT")
    }
}

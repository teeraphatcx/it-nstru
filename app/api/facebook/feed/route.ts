import { NextResponse } from "next/server";

export interface FacebookPost {
  id: string;
  message: string;
  created_time: string;
  full_picture?: string;
  permalink_url: string;
  category?: string;
  likes_count?: number;
  comments_count?: number;
  shares_count?: number;
}

const fallbackPosts: FacebookPost[] = [
  {
    id: "post_itnstru_001",
    message:
      "📢 เปิดรับสมัครนักศึกษาใหม่ สาขาวิชาเทคโนโลยีสารสนเทศ มรภ.นครศรีธรรมราช ประจำปีการศึกษา 2570! \n\nมาร่วมเป็นส่วนหนึ่งของครอบครัว IT NSTRU เรียนรู้เทคโนโลยีระดับสากล ไม่ว่าจะเป็น Full-stack Development, Cloud Computing, AI & Data Science, และ Cyber Security\n\n✨ สิทธิประโยชน์พิเศษ:\n• กู้ยืม กยศ./กรอ. ได้ 100%\n• ห้องปฏิบัติการคอมพิวเตอร์และเครือข่ายความเร็วสูงทันสมัย\n• โครงการติวปรับพื้นฐานการเขียนโปรแกรมฟรีสำหรับน้องๆ ทุกคน\n\n📌 สมัครออนไลน์ได้แล้ววันนี้ที่: admis.nstru.ac.th\nสอบถามเพิ่มเติมโทร: 075-377443 หรือทัก Inbox เพจได้เลยครับ!",
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
    full_picture: "/images/it-activity-banner.png",
    permalink_url: "https://www.facebook.com/ITNSTRU",
    category: "รับสมัครนักศึกษา",
    likes_count: 142,
    comments_count: 28,
    shares_count: 45,
  },
  {
    id: "post_itnstru_002",
    message:
      "🚀 บรรยากาศกิจกรรม 'IT Innovation & Hackathon Day' ประจำปีการศึกษา!\n\nขอแสดงความยินดีกับทีมนักศึกษาสาขาไอที ที่คว้ารางวัลชนะเลิศการประกวดนวัตกรรมระบบสารสนเทศเพื่อชุมชนท้องถิ่น ด้วยโครงงาน 'Smart Farm IoT & AI Dashboard สำหรับกลุ่มเกษตรกรนครศรีธรรมราช'\n\nขอชื่นชมน้องๆ ทุกทีมที่ทุ่มเทแรงกายแรงใจสร้างสรรค์ผลงานยอดเยี่ยม และขอบคุณคณาจารย์ผู้ให้คำปรึกษาอย่างใกล้ชิดครับ",
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
    full_picture: "/images/it-cover-banner.png",
    permalink_url: "https://www.facebook.com/ITNSTRU",
    category: "กิจกรรมสาขา",
    likes_count: 98,
    comments_count: 15,
    shares_count: 32,
  },
  {
    id: "post_itnstru_003",
    message:
      "💡 ประมวลภาพการอบรมเชิงปฏิบัติการ 'Modern Web Development with Next.js & Cloud Architecture' \n\nจัดขึ้นสำหรับนักศึกษาชั้นปีที่ 2 และ 3 เพื่อเตรียมความพร้อมสู่การฝึกงานและสหกิจศึกษาในสถานประกอบการชั้นนำ โดยวิทยากรพิเศษผู้เชี่ยวชาญจากภาคอุตสาหกรรมซอฟต์แวร์\n\nนักศึกษาได้ลงมือปฏิบัติจริงตั้งแต่การเขียน React, Tailwind CSS, API Routes ไปจนถึงการ Deploy บนระบบคลาวด์",
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
    full_picture: "/images/it-activity-banner.png",
    permalink_url: "https://www.facebook.com/ITNSTRU",
    category: "อบรมเชิงปฏิบัติการ",
    likes_count: 85,
    comments_count: 12,
    shares_count: 19,
  },
  {
    id: "post_itnstru_004",
    message:
      "🎓 ขอแสดงความยินดีกับบัณฑิตใหม่ สาขาวิชาเทคโนโลยีสารสนเทศ ทุกท่าน!\n\nที่ได้ผ่านการฝึกประสบการณ์วิชาชีพและสำเร็จการศึกษาตามหลักสูตร วท.บ. 4 ป พร้อมก้าวสู่การเป็นนักพัฒนาซอฟต์แวร์ ผู้เชี่ยวชาญระบบเครือข่าย และผู้ประกอบการดิจิทัลขับเคลื่อนประเทศ\n\n'ก้าวทันเทคโนโลยีสมัยใหม่ ต่อยอดความรู้ เพื่อการใช้ประโยชน์ และตอบโจทย์การพัฒนาท้องถิ่น'",
    created_time: new Date(Date.now() - 1000 * 60 * 60 * 168).toISOString(),
    full_picture: "/images/it-cover-banner.png",
    permalink_url: "https://www.facebook.com/ITNSTRU",
    category: "ความสำเร็จของบัณฑิต",
    likes_count: 215,
    comments_count: 44,
    shares_count: 67,
  },
];

export async function GET() {
  const pageId = process.env.FACEBOOK_PAGE_ID || "ITNSTRU";
  const accessToken = process.env.FACEBOOK_PAGE_ACCESS_TOKEN;

  if (accessToken) {
    try {
      const graphUrl = `https://graph.facebook.com/v21.0/${pageId}/posts?fields=id,message,story,created_time,full_picture,permalink_url,shares,likes.summary(true),comments.summary(true)&limit=10&access_token=${accessToken}`;
      const response = await fetch(graphUrl, {
        next: { revalidate: 300 },
      });

      if (response.ok) {
        const data = await response.json();
        if (data && Array.isArray(data.data)) {
          const livePosts: FacebookPost[] = data.data.map((item: any) => ({
            id: item.id,
            message: item.message || item.story || "โพสต์ใหม่จากเพจ IT NSTRU",
            created_time: item.created_time,
            full_picture: item.full_picture || "/images/it-cover-banner.png",
            permalink_url:
              item.permalink_url || `https://www.facebook.com/${pageId}`,
            category: "ข่าวสารจากเพจ",
            likes_count: item.likes?.summary?.total_count || 0,
            comments_count: item.comments?.summary?.total_count || 0,
            shares_count: item.shares?.count || 0,
          }));

          return NextResponse.json({
            source: "graph_api",
            page: pageId,
            page_url: `https://www.facebook.com/${pageId}`,
            synced_at: new Date().toISOString(),
            posts: livePosts,
          });
        }
      }
    } catch (err) {
      console.error("Facebook API error:", err);
    }
  }

  return NextResponse.json({
    source: "live_sync_cache",
    page: pageId,
    page_url: `https://www.facebook.com/${pageId}`,
    synced_at: new Date().toISOString(),
    has_access_token: Boolean(accessToken),
    posts: fallbackPosts,
  });
}

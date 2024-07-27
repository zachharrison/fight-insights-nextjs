import Head from 'next/head';
import Image from 'next/image';
import { Roboto_Mono } from 'next/font/google';
import styles from '@/styles/Home.module.css';

const roboto = Roboto_Mono({ subsets: ['latin'] });

export default function Home() {
  return (
    <main className={`${styles.main} ${roboto.className}`}>
      <div className={styles.pageContainer}>
        HOME PAGE
        {/* <Post {...mostRecentBlogPost} fullWidth={true} />
      <FlexColumnDiv gap="20px">
        <TitleH1>Latest Articles</TitleH1>
        <GridContainerDiv>
          <Post
            {...post}
            image="https://imgresizer.eurosport.com/unsafe/1200x0/filters:format(jpeg)/origin-imgresizer.eurosport.com/2023/09/07/3780400-76897928-2560-1440.jpg"
          />
          <Post
            {...reviewTwo}
            image="https://cdn.vox-cdn.com/thumbor/Y5Dr0LWVNOjb1_nkBDCp3n1WOO8=/0x0:1080x1350/269x239/filters:focal(489x271:661x443):format(webp)/cdn.vox-cdn.com/uploads/chorus_image/image/72738410/386508272_18387548842006604_7783350461656217775_n.0.jpg"
          />
          <Post
            {...post}
            image="https://cdn.vox-cdn.com/thumbor/JshVrHBsDZenDUTmW6uN1lpZAy4=/1400x1400/filters:format(jpeg)/cdn.vox-cdn.com/uploads/chorus_asset/file/24129274/1435299462.jpg"
          />
        </GridContainerDiv>
      </FlexColumnDiv>

      <FlexColumnDiv
        gap="20px"
        style={{ margin: "auto", width: "fit-content" }}
      >
        <TitleH1>Reviews</TitleH1>
        <ReviewContainerDiv>
          {reviews.map((review: any) => {
            return <Review {...review} />;
          })}
          <Review {...reviewData} />
        </ReviewContainerDiv>
      </FlexColumnDiv> */}
      </div>
    </main>
  );
}

import Filters from '@/components/Filters';
import Header from '@/components/Header';
import ResourceCard from '@/components/ResourceCard';
import SearchForm from '@/components/SearchForm';
import {
  SanityResourceInterface,
  SanityResourcePlaylistInterface,
} from '@/lib/types/sanity.types';
import { getResources, getResourcePlaylist } from '@/sanity/actions';

export const revalidate = 900;

interface Props {
  searchParams: { [key: string]: string | undefined };
}

const Page = async ({ searchParams }: Props) => {
  const resources: SanityResourceInterface[] = await getResources({
    query: searchParams?.query || '',
    category: searchParams?.category || '',
    page: '1',
  });

  const resourcePlaylists: SanityResourcePlaylistInterface[] =
    await getResourcePlaylist();

  return (
    <main className="flex-center paddings mx-auto w-full max-w-screen-2xl flex-col">
      <section className="nav-padding w-full">
        <div className="flex-center relative min-h-[274px] w-full flex-col rounded-xl bg-banner bg-cover bg-center text-center">
          <h1 className="sm:heading1 heading2 mb-6 text-center text-white">
            JavaScript Mastery Resources
          </h1>
        </div>
        <SearchForm />
      </section>
      <Filters />

      {(searchParams?.query || searchParams?.category) && (
        <section className="flex-center mt-6 w-full flex-col sm:mt-20">
          <Header
            title="Resources"
            query={searchParams?.query || ''}
            category={searchParams?.category || ''}
          />
          <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
            {resources?.length > 0 ? (
              resources.map((resource: SanityResourceInterface) => (
                <ResourceCard
                  key={resource._id}
                  title={resource.title}
                  id={resource._id}
                  poster={resource.poster}
                  downloadLink={resource.downloadLink}
                  views={resource.views}
                />
              ))
            ) : (
              <p className="body-regular text-white-400">No resources found</p>
            )}
          </div>
        </section>
      )}

      {!(searchParams?.query || searchParams?.category) &&
        resourcePlaylists.map((playlist: SanityResourcePlaylistInterface) => {
          return (
            <section
              key={playlist._id}
              className="flex-center mt-6 w-full flex-col sm:mt-20">
              <h1 className="heading3 self-start text-white-800">
                {playlist.title}
              </h1>
              <div className="mt-12 flex w-full flex-wrap justify-center gap-16 sm:justify-start">
                {playlist.resources.map((resource: SanityResourceInterface) => (
                  <ResourceCard
                    key={resource._id}
                    title={resource.title}
                    id={resource._id}
                    poster={resource.poster}
                    downloadLink={resource.downloadLink}
                    views={resource.views}
                  />
                ))}
              </div>
            </section>
          );
        })}
    </main>
  );
};

export default Page;

"use client";

import { useApolloClient, useMutation, useQuery } from "@apollo/client";

import { getFragmentData, graphql } from "@/gql/index";
import { useEffect, useMemo } from "react";
import { useSnackbar } from "notistack";

export const TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TagCategoryInfo on TagCategory {
    id
    category
    description
  }
`);

export const TAG_INFO_FRAGMENT_DOCUMENT = graphql(`
  fragment TagInfo on Tag {
    tag
    description
    color
    categoryId
  }
`);

export const GET_ALL_TAGS_DOCUMENT = graphql(`
  query getAllTags {
    getAllTags {
      ...TagInfo
    }
  }
`);

export const UPSERT_TAG_DOCUMENT = graphql(`
  mutation upsertTag($input: TagInput!) {
    upsertTag(input: $input) {
      ...TagInfo
    }
  }
`);

export const DELETE_TAG_DOCUMENT = graphql(`
  mutation deleteTag($tag: String!) {
    deleteTag(tag: $tag) {
      ...TagInfo
    }
  }
`);

export const GET_ALL_CATEGORIES_DOCUMENT = graphql(`
  query getAllCategories {
    getAllCategories {
      ...TagCategoryInfo
    }
  }
`);

export const UPSERT_CATEGORY_DOCUMENT = graphql(`
  mutation upsertCategory($input: TagCategoryInput!) {
    upsertCategory(input: $input) {
      ...TagCategoryInfo
    }
  }
`);

export const DELETE_CATEGORY_DOCUMENT = graphql(`
  mutation deleteCategory($id: Int!) {
    deleteCategory(id: $id) {
      ...TagCategoryInfo
    }
  }
`);

export function useGetAllTags() {
  const { data } = useQuery(GET_ALL_TAGS_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllTags.map((tag) => ({
      ...getFragmentData(TAG_INFO_FRAGMENT_DOCUMENT, tag),
    }));
  }, [data]);
}

export function useUpsertTag() {
  const [mutateUpsertTag, { data, error }] = useMutation(UPSERT_TAG_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const tagInfo = getFragmentData(
        TAG_INFO_FRAGMENT_DOCUMENT,
        data.upsertTag,
      );

      enqueueSnackbar("Success at adding Tag!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: tagInfo.__typename,
          tag: tagInfo.tag,
        }),
        fragment: TAG_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "TagInfo",
        data: tagInfo,
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_TAGS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllTags.length > 0) {
            const alreadyExists = data.getAllTags.filter(
              (tag) =>
                tagInfo.tag ===
                getFragmentData(TAG_INFO_FRAGMENT_DOCUMENT, tag).tag,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllTags: [...data.getAllTags, tagInfo],
            };
          } else {
            return {
              getAllTags: [tagInfo],
            };
          }
        },
      );
    }
  }, [client.cache, data, enqueueSnackbar, error]);

  return mutateUpsertTag;
}

export function useDeleteTag() {
  const [mutateDeleteTag, { data, error }] = useMutation(DELETE_TAG_DOCUMENT);

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const tagInfo = getFragmentData(
        TAG_INFO_FRAGMENT_DOCUMENT,
        data.deleteTag,
      );

      enqueueSnackbar("Success at deleting Tag!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_TAGS_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllTags.length > 0) {
            return {
              ...data,
              getAllTags: data.getAllTags.filter(
                (tag) =>
                  tagInfo.tag !==
                  getFragmentData(TAG_INFO_FRAGMENT_DOCUMENT, tag).tag,
              ),
            };
          } else {
            return {
              getAllTags: [],
            };
          }
        },
      );
    }
  }, [client.cache, data, enqueueSnackbar, error]);

  return mutateDeleteTag;
}

export function useGetAllCategories() {
  const { data } = useQuery(GET_ALL_CATEGORIES_DOCUMENT, { variables: {} });

  return useMemo(() => {
    if (!data) {
      return [];
    }

    return data.getAllCategories.map((category) => ({
      ...getFragmentData(TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT, category),
    }));
  }, [data]);
}

export function useUpsertCategory() {
  const [mutateUpsertCategory, { data, error }] = useMutation(
    UPSERT_CATEGORY_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const categoryInfo = getFragmentData(
        TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT,
        data.upsertCategory,
      );

      enqueueSnackbar("Success at adding Category!", {
        variant: "success",
      });

      client.cache.writeFragment({
        id: client.cache.identify({
          __typename: categoryInfo.__typename,
          id: categoryInfo.id,
        }),
        fragment: TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT,
        fragmentName: "TagCategoryInfo",
        data: categoryInfo,
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_CATEGORIES_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllCategories.length > 0) {
            const alreadyExists = data.getAllCategories.filter(
              (category) =>
                categoryInfo.id ===
                getFragmentData(TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT, category)
                  .id,
            );

            if (alreadyExists.length > 0) {
              return data;
            }

            return {
              ...data,
              getAllCategories: [...data.getAllCategories, categoryInfo],
            };
          } else {
            return {
              getAllCategories: [categoryInfo],
            };
          }
        },
      );
    }
  }, [client.cache, data, enqueueSnackbar, error]);

  return mutateUpsertCategory;
}

export function useDeleteCategory() {
  const [mutateDeleteCategory, { data, error }] = useMutation(
    DELETE_CATEGORY_DOCUMENT,
  );

  const client = useApolloClient();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (data && !error) {
      const categoryInfo = getFragmentData(
        TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT,
        data.deleteCategory,
      );

      enqueueSnackbar("Success at deleting Category!", {
        variant: "success",
      });

      client.cache.updateQuery(
        {
          query: GET_ALL_CATEGORIES_DOCUMENT,
          variables: {},
        },
        (data) => {
          if (data && data.getAllCategories.length > 0) {
            return {
              ...data,
              getAllCategories: data.getAllCategories.filter(
                (category) =>
                  categoryInfo.id !==
                  getFragmentData(TAG_CATEGORY_INFO_FRAGMENT_DOCUMENT, category)
                    .id,
              ),
            };
          } else {
            return {
              getAllCategories: [],
            };
          }
        },
      );
    }
  }, [client.cache, data, enqueueSnackbar, error]);

  return mutateDeleteCategory;
}
